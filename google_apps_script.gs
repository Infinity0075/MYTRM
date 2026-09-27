/**
 * ============================================================================
 * MYTRM - Google Apps Script Backend Web App API (WhatsApp + Admin Approval Spec)
 * ============================================================================
 * Instructions:
 * 1. Open your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste this entire code into `Code.gs`.
 * 3. Run `setupSheets()` once to set up headers and default sample data.
 * 4. Click "Deploy" -> "New deployment" -> Select "Web app".
 * 5. Execute as: "Me", Who has access: "Anyone".
 * 6. Copy the Web App URL and paste it into `js/api.js` (`APPS_SCRIPT_URL`).
 *
 * NOTE ON EARLY-STAGE WHATSAPP + MANUAL APPROVAL WORKFLOW:
 * This manual-approval flow (status: pending_payment -> confirmed via admin)
 * is an intentional early-stage MVP pattern for low-volume operation without payment gateways.
 * A human manually verifies payments via WhatsApp before approving bookings and issuing Google Meet links.
 * ============================================================================
 */

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Tab: Doctors
  let doctorsSheet = ss.getSheetByName("Doctors");
  if (!doctorsSheet) {
    doctorsSheet = ss.insertSheet("Doctors");
    doctorsSheet.appendRow([
      "id", "name", "email", "password", "photoUrl", "title", "qualifications", "experience", 
      "rating", "specializations", "languages", "price", "sessionDuration", 
      "bio", "approach", "calendlyLink"
    ]);
    doctorsSheet.appendRow([
      "d01", "Neetee Bhardwaj", "neetee@mytrm.in", "doctor123",
      "/assets/doctors/IMG_6971 - Neetee Bhardwaj.jpeg",
      "Counseling Psychologist & Expressive Arts Therapist", "MA in Applied Psychology (Clinical & Counseling Specialty)", 5, null,
      "Depression & Mood Disorders, Anxiety Disorders, Relationship Issues, Family Conflicts, Trauma & PTSD, Self-Esteem & Identity, Stress Management", "English, Hindi", "Contact for pricing", "50 mins",
      "I believe therapy is a collaborative journey towards self-discovery and healing.",
      "Integrative approach combining Cognitive Behavioral Therapy (CBT), Psychodynamic Therapy, and Expressive Arts Therapy.", ""
    ]);
  }

  // Tab: Users
  let usersSheet = ss.getSheetByName("Users");
  if (!usersSheet) {
    usersSheet = ss.insertSheet("Users");
    usersSheet.appendRow(["id", "name", "email", "password", "phone", "dob", "photoUrl", "createdAt"]);
    usersSheet.appendRow(["u1", "Priyanshu Mehta", "user@mytrm.in", "user123", "+91 98765 43210", "1998-05-14", "", new Date().toISOString()]);
  }

  // Tab: Bookings (status: pending_payment, confirmed, cancelled)
  let bookingsSheet = ss.getSheetByName("Bookings");
  if (!bookingsSheet) {
    bookingsSheet = ss.insertSheet("Bookings");
    bookingsSheet.appendRow(["id", "userEmail", "doctorId", "date", "time", "meetLink", "status", "source", "createdAt"]);
    bookingsSheet.appendRow([
      "bk_101", "user@mytrm.in", "d01", "2026-09-28", "05:00 PM",
      "https://meet.google.com/abc-defg-hij", "confirmed", "whatsapp_manual", new Date().toISOString()
    ]);
  }

  // Tab: ContactSubmissions
  let contactSheet = ss.getSheetByName("ContactSubmissions");
  if (!contactSheet) {
    contactSheet = ss.insertSheet("ContactSubmissions");
    contactSheet.appendRow(["name", "email", "phone", "subject", "message", "submittedAt"]);
  }

  // Tab: Admins
  let adminsSheet = ss.getSheetByName("Admins");
  if (!adminsSheet) {
    adminsSheet = ss.insertSheet("Admins");
    adminsSheet.appendRow(["email", "password"]);
    adminsSheet.appendRow(["admin@mytrm.in", "admin123"]);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  let result = { success: false, error: "Invalid action" };

  try {
    if (action === "getDoctors") {
      result = { success: true, data: getRowsAsObjects("Doctors") };
    } else if (action === "getUserBookings") {
      const email = e.parameter.email;
      const all = getRowsAsObjects("Bookings");
      const filtered = all.filter(b => String(b.userEmail).toLowerCase() === String(email).toLowerCase());
      result = { success: true, data: filtered };
    } else if (action === "getDoctorBookings") {
      const doctorId = e.parameter.doctorId;
      const all = getRowsAsObjects("Bookings");
      const filtered = all.filter(b => String(b.doctorId) === String(doctorId) && String(b.status).toLowerCase() === "confirmed");
      result = { success: true, data: filtered };
    } else if (action === "getAllBookings") {
      result = { success: true, data: getRowsAsObjects("Bookings") };
    } else if (action === "getContactSubmissions") {
      result = { success: true, data: getRowsAsObjects("ContactSubmissions") };
    }
  } catch (err) {
    result = { success: false, error: err.toString() };
  }

  return responseJSON(result);
}

function doPost(e) {
  let postData = {};
  try {
    postData = JSON.parse(e.postData.contents);
  } catch (err) {
    postData = e.parameter || {};
  }

  const action = postData.action || e.parameter.action;

  let result = { success: false, error: "Invalid action" };

  try {
    if (action === "registerUser") {
      result = registerUser(postData);
    } else if (action === "loginUser") {
      result = loginUser(postData);
    } else if (action === "loginDoctor") {
      result = loginDoctor(postData);
    } else if (action === "loginAdmin") {
      result = loginAdmin(postData);
    } else if (action === "addDoctor") {
      result = addDoctor(postData);
    } else if (action === "updateDoctor") {
      result = updateDoctor(postData);
    } else if (action === "deleteDoctor") {
      result = deleteDoctor(postData);
    } else if (action === "createBooking") {
      result = createBooking(postData);
    } else if (action === "updateBookingStatus") {
      result = updateBookingStatus(postData);
    } else if (action === "submitContactForm") {
      result = submitContactForm(postData);
    }
  } catch (err) {
    result = { success: false, error: err.toString() };
  }

  return responseJSON(result);
}

// ----------------------------------------------------------------------------
// ACTION HANDLERS
// ----------------------------------------------------------------------------
function registerUser(data) {
  const users = getRowsAsObjects("Users");
  const exists = users.find(u => String(u.email).toLowerCase() === String(data.email).toLowerCase());
  if (exists) {
    return { success: false, error: "An account with this email already exists." };
  }

  const newId = "usr_" + new Date().getTime();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
  sheet.appendRow([
    newId, data.name, data.email, data.password, data.phone || "", data.dob || "", data.photoUrl || "", new Date().toISOString()
  ]);

  return { success: true, user: { id: newId, name: data.name, email: data.email, role: "USER", photoUrl: data.photoUrl } };
}

function loginUser(data) {
  const users = getRowsAsObjects("Users");
  const user = users.find(u => String(u.email).toLowerCase() === String(data.email).toLowerCase() && String(u.password) === String(data.password));
  if (!user) {
    return { success: false, error: "Invalid email or password for user account." };
  }
  return { success: true, user: { id: user.id, name: user.name, email: user.email, role: "USER", photoUrl: user.photoUrl } };
}

function loginDoctor(data) {
  const doctors = getRowsAsObjects("Doctors");
  const inputIdent = String(data.email || data.username || "").toLowerCase();
  const doctor = doctors.find(d => 
    (String(d.email).toLowerCase() === inputIdent || String(d.name).toLowerCase().includes(inputIdent)) &&
    String(d.password || "doctor123") === String(data.password)
  );
  if (!doctor) {
    return { success: false, error: "Invalid credentials for doctor login." };
  }
  return { success: true, user: { id: doctor.id, doctorId: doctor.id, name: doctor.name, email: doctor.email || "doctor@mytrm.in", role: "DOCTOR", photoUrl: doctor.photoUrl } };
}

function loginAdmin(data) {
  const admins = getRowsAsObjects("Admins");
  const admin = admins.find(a => String(a.email).toLowerCase() === String(data.email).toLowerCase() && String(a.password) === String(data.password));
  if (!admin) {
    return { success: false, error: "Invalid admin email or password." };
  }
  return { success: true, user: { id: "admin", name: "System Administrator", email: admin.email, role: "ADMIN" } };
}

function addDoctor(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Doctors");
  const newId = "doc_" + new Date().getTime();
  sheet.appendRow([
    newId, data.name, data.email || (data.name.toLowerCase().replace(/[^a-z]/g, "") + "@mytrm.in"), data.password || "doctor123",
    data.photoUrl, data.title, data.qualifications, data.experience || 5,
    data.rating || 5.0, data.specializations, data.languages, data.price || 1200,
    data.sessionDuration || "50 mins", data.bio, data.approach, data.calendlyLink
  ]);
  return { success: true, id: newId };
}

function updateDoctor(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Doctors");
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) {
      sheet.getRange(i + 1, 2, 1, 15).setValues([[
        data.name, data.email || rows[i][2], data.password || rows[i][3], data.photoUrl, data.title,
        data.qualifications, data.experience, data.rating || 4.9, data.specializations,
        data.languages, data.price, data.sessionDuration, data.bio, data.approach, data.calendlyLink
      ]]);
      return { success: true };
    }
  }
  return { success: false, error: "Doctor ID not found." };
}

function deleteDoctor(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Doctors");
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { success: false, error: "Doctor ID not found." };
}

function createBooking(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bookings");
  const bookingId = "bk_" + Math.floor(100000 + Math.random() * 900000);
  const status = data.status || "pending_payment";
  const meetLink = data.meetLink || "";
  sheet.appendRow([
    bookingId, data.userEmail, data.doctorId, data.date, data.time, meetLink, status, data.source || "whatsapp_manual", new Date().toISOString()
  ]);
  return { success: true, bookingId: bookingId, status: status };
}

function updateBookingStatus(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bookings");
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.bookingId)) {
      if (data.status) sheet.getRange(i + 1, 7).setValue(data.status); // Col 7: status
      if (data.meetLink) sheet.getRange(i + 1, 6).setValue(data.meetLink); // Col 6: meetLink
      return { success: true };
    }
  }
  return { success: false, error: "Booking ID not found." };
}

function submitContactForm(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ContactSubmissions");
  sheet.appendRow([data.name, data.email, data.phone || "", data.subject, data.message, new Date().toISOString()]);
  return { success: true };
}

// ----------------------------------------------------------------------------
// UTILITIES
// ----------------------------------------------------------------------------
function getRowsAsObjects(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  const headers = data[0];
  const result = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    result.push(obj);
  }
  return result;
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
