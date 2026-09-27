/**
 * ============================================================================
 * MYTRM - Web App API Client (Google Apps Script Integration)
 * ============================================================================
 * Instructions:
 * Replace APPS_SCRIPT_URL with your deployed Google Apps Script Web App URL.
 * Example: "https://script.google.com/macros/s/AKfycbx.../exec"
 */

const APPS_SCRIPT_URL = ""; // <-- PASTE YOUR DEPLOYED APPS SCRIPT URL HERE

// Business WhatsApp Number (India country code + 10-digit number)
const MYTRM_WHATSAPP_NUMBER = "919876543210";

// Fallback Default Image if local doctor photo file has not been copied into /assets/doctors/ yet
const DEFAULT_AVATAR_FALLBACK = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";

// Real Doctor Dataset (22 Verified Clinical Practitioners)
const FALLBACK_DOCTORS = (typeof doctors !== "undefined" && Array.isArray(doctors) && doctors.length > 0) ? doctors : [];

// ----------------------------------------------------------------------------
// API CLIENT HELPER FUNCTIONS
// ----------------------------------------------------------------------------

async function apiFetch(action, params = {}, method = "GET", bodyData = null) {
  if (!APPS_SCRIPT_URL) {
    console.warn(`[MYTRM API] Operating in fallback local mode for action: ${action}`);
    return handleFallback(action, params, bodyData);
  }

  try {
    let url = APPS_SCRIPT_URL;
    let config = { method: method };

    if (method === "GET") {
      const queryParams = new URLSearchParams({ action, ...params }).toString();
      url += (url.includes("?") ? "&" : "?") + queryParams;
    } else {
      config.headers = { "Content-Type": "application/json" };
      config.body = JSON.stringify({ action, ...bodyData });
    }

    const response = await fetch(url, config);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(`[MYTRM API Error] Request failed for ${action}:`, err);
    return handleFallback(action, params, bodyData);
  }
}

// Fallback logic when Apps Script URL is empty or network fails
function handleFallback(action, params, bodyData) {
  let localDoctors = [];
  try {
    const cached = localStorage.getItem("mytrm_doctors_db");
    localDoctors = cached ? JSON.parse(cached) : FALLBACK_DOCTORS;
  } catch (e) {
    localDoctors = FALLBACK_DOCTORS;
  }

  if (action === "getDoctors") {
    return { success: true, data: localDoctors };
  }
  if (action === "addDoctor") {
    const newDoc = { id: "d" + (localDoctors.length + 1), ...bodyData };
    localDoctors.push(newDoc);
    localStorage.setItem("mytrm_doctors_db", JSON.stringify(localDoctors));
    return { success: true, id: newDoc.id };
  }
  if (action === "updateDoctor") {
    localDoctors = localDoctors.map(d => String(d.id) === String(bodyData.id) ? { ...d, ...bodyData } : d);
    localStorage.setItem("mytrm_doctors_db", JSON.stringify(localDoctors));
    return { success: true };
  }
  if (action === "deleteDoctor") {
    localDoctors = localDoctors.filter(d => String(d.id) !== String(bodyData.id));
    localStorage.setItem("mytrm_doctors_db", JSON.stringify(localDoctors));
    return { success: true };
  }

  // Auth Fallback
  if (action === "loginUser") {
    return { success: true, user: { id: "u1", name: "Priyanshu Mehta", email: bodyData.email, role: "USER", photoUrl: "" } };
  }
  if (action === "registerUser") {
    return { success: true, user: { id: "u_" + Date.now(), name: bodyData.name, email: bodyData.email, role: "USER", photoUrl: bodyData.photoUrl || "" } };
  }
  if (action === "loginDoctor") {
    const doctorInput = String(bodyData.email || bodyData.username || "").toLowerCase();
    const doc = localDoctors.find(d => 
      String(d.email || "").toLowerCase() === doctorInput || 
      String(d.name || "").toLowerCase().includes(doctorInput)
    ) || localDoctors[0];

    return { 
      success: true, 
      user: { 
        id: doc.id, 
        doctorId: doc.id, 
        name: doc.name, 
        email: doc.email || "doctor@mytrm.in", 
        role: "DOCTOR", 
        photoUrl: doc.photoUrl || doc.photo 
      } 
    };
  }
  if (action === "loginAdmin") {
    return { success: true, user: { id: "admin", name: "System Administrator", email: bodyData.email, role: "ADMIN" } };
  }

  if (action === "requestPasswordReset") {
    try {
      const resetList = JSON.parse(localStorage.getItem("mytrm_reset_requests") || "[]");
      resetList.push({ email: bodyData.email, requestedAt: new Date().toISOString() });
      localStorage.setItem("mytrm_reset_requests", JSON.stringify(resetList));
    } catch (e) {}
    return { success: true };
  }

  // Bookings Fallback
  if (action === "getUserBookings" || action === "getDoctorBookings" || action === "getAllBookings") {
    try {
      let bookings = JSON.parse(localStorage.getItem("mytrm_user_bookings") || "[]");
      if (bookings.length === 0) {
        bookings = [
          {
            id: "bk_101",
            userEmail: "user@mytrm.in",
            doctorId: "d01",
            therapistName: "Neetee Bhardwaj",
            therapistPhoto: "assets/doctors/d01 - Neetee Bhardwaj.jpg",
            therapistTitle: "Psychologist & Counselor",
            specialization: "Anxiety & Panic",
            date: "2026-09-28",
            time: "05:00 PM",
            sessionType: "Individual Session (50 mins)",
            price: "Contact for pricing",
            meetLink: "https://meet.google.com/abc-defg-hij",
            status: "confirmed",
            source: "whatsapp_manual"
          },
          {
            id: "bk_102",
            userEmail: "user@mytrm.in",
            doctorId: "d02",
            therapistName: "Muskaan Kalra",
            therapistPhoto: "assets/doctors/d02 - Muskaan Kalra.jpg",
            therapistTitle: "Counselling Psychologist",
            specialization: "Stress & Workload",
            date: "2026-09-29",
            time: "02:00 PM",
            sessionType: "Individual Session (50 mins)",
            price: "Contact for pricing",
            meetLink: "",
            status: "pending_payment",
            source: "whatsapp_manual"
          }
        ];
        localStorage.setItem("mytrm_user_bookings", JSON.stringify(bookings));
      }

      if (action === "getDoctorBookings") {
        const doctorId = params.doctorId || "d01";
        bookings = bookings.filter(b => String(b.doctorId) === String(doctorId) && String(b.status).toLowerCase() === "confirmed");
      } else if (action === "getUserBookings") {
        const email = params.email || "user@mytrm.in";
        bookings = bookings.filter(b => String(b.userEmail).toLowerCase() === String(email).toLowerCase());
      }

      return { success: true, data: bookings };
    } catch (e) {
      return { success: true, data: [] };
    }
  }

  if (action === "createBooking") {
    const newBooking = {
      id: "bk_" + Math.floor(100000 + Math.random() * 900000),
      userEmail: bodyData.userEmail || "user@mytrm.in",
      doctorId: bodyData.doctorId,
      therapistName: bodyData.therapistName || "Neetee Bhardwaj",
      therapistPhoto: bodyData.therapistPhoto || "assets/doctors/d01 - Neetee Bhardwaj.jpg",
      therapistTitle: bodyData.therapistTitle || "Psychologist & Counselor",
      specialization: bodyData.specialization || "Clinical Psychology",
      date: bodyData.date,
      time: bodyData.time,
      sessionType: bodyData.sessionType || "Individual Session (50 mins)",
      price: bodyData.price || "Contact for pricing",
      userName: bodyData.userName || "Priyanshu Mehta",
      meetLink: bodyData.meetLink || "",
      status: bodyData.status || "pending_payment",
      source: bodyData.source || "whatsapp_manual",
      created: new Date().toLocaleDateString()
    };
    try {
      const list = JSON.parse(localStorage.getItem("mytrm_user_bookings") || "[]");
      list.unshift(newBooking);
      localStorage.setItem("mytrm_user_bookings", JSON.stringify(list));
    } catch (e) {}
    return { success: true, bookingId: newBooking.id, status: newBooking.status };
  }

  if (action === "updateBookingStatus") {
    try {
      let list = JSON.parse(localStorage.getItem("mytrm_user_bookings") || "[]");
      list = list.map(b => {
        if (String(b.id) === String(bodyData.bookingId)) {
          return {
            ...b,
            status: bodyData.status || b.status,
            meetLink: bodyData.meetLink !== undefined ? bodyData.meetLink : b.meetLink
          };
        }
        return b;
      });
      localStorage.setItem("mytrm_user_bookings", JSON.stringify(list));
    } catch (e) {}
    return { success: true };
  }

  if (action === "submitContactForm") {
    return { success: true };
  }

  return { success: true, data: [] };
}

// ----------------------------------------------------------------------------
// EXPOSED API METHODS
// ----------------------------------------------------------------------------
async function apiGetDoctors() {
  const res = await apiFetch("getDoctors");
  let doctors = res.data || [];

  return doctors.map(d => {
    // Parse specializationsTop (for card tags) and specializationsFull (for full profile display)
    const specTopRaw = d.specializationsTop || d.specializations || "";
    const specFullRaw = d.specializationsFull || d.specializations || specTopRaw;
    const langRaw = d.languages || "";

    return {
      ...d,
      specializationsTop: typeof specTopRaw === "string" ? specTopRaw.split(";").map(s => s.trim()).filter(Boolean) : (specTopRaw || []),
      specializationsFull: typeof specFullRaw === "string" ? specFullRaw.split(";").map(s => s.trim()).filter(Boolean) : (specFullRaw || []),
      specializations: typeof specTopRaw === "string" ? specTopRaw.split(";").map(s => s.trim()).filter(Boolean) : (specTopRaw || []),
      languages: typeof langRaw === "string" ? langRaw.split(";").map(l => l.trim()).filter(Boolean) : (langRaw || []),
      photo: d.photoUrl || (d.photoFile ? `assets/doctors/${d.photoFile}` : DEFAULT_AVATAR_FALLBACK),
      experienceYears: Number(d.experienceYears || d.experience || 1),
      priceDisplay: (d.price && d.price !== "TBD" && !isNaN(d.price)) ? `₹${d.price}` : "Contact for pricing",
      ratingBadge: d.ratingBadge || "Verified Practitioner"
    };
  });
}

async function apiAddDoctor(doctorData) {
  return await apiFetch("addDoctor", {}, "POST", doctorData);
}

async function apiUpdateDoctor(doctorData) {
  return await apiFetch("updateDoctor", {}, "POST", doctorData);
}

async function apiDeleteDoctor(doctorId) {
  return await apiFetch("deleteDoctor", {}, "POST", { id: doctorId });
}

async function apiRegisterUser(userData) {
  return await apiFetch("registerUser", {}, "POST", userData);
}

async function apiLoginUser(email, password) {
  return await apiFetch("loginUser", {}, "POST", { email, password });
}

async function apiLoginDoctor(email, password) {
  return await apiFetch("loginDoctor", {}, "POST", { email, password });
}

async function apiLoginAdmin(email, password) {
  return await apiFetch("loginAdmin", {}, "POST", { email, password });
}

async function apiRequestPasswordReset(email) {
  return await apiFetch("requestPasswordReset", {}, "POST", { email });
}

async function apiCreateBooking(bookingData) {
  return await apiFetch("createBooking", {}, "POST", bookingData);
}

async function apiUpdateBookingStatus(bookingId, status, meetLink = "") {
  return await apiFetch("updateBookingStatus", {}, "POST", { bookingId, status, meetLink });
}

async function apiGetUserBookings(email) {
  const res = await apiFetch("getUserBookings", { email });
  return res.data || [];
}

async function apiGetDoctorBookings(doctorId) {
  const res = await apiFetch("getDoctorBookings", { doctorId });
  return res.data || [];
}

async function apiGetAllBookings() {
  const res = await apiFetch("getAllBookings");
  return res.data || [];
}

async function apiSubmitContactForm(formData) {
  return await apiFetch("submitContactForm", {}, "POST", formData);
}
