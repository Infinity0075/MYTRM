/**
 * ============================================================================
 * MYTRM - Authentication & Role Session Handler
 * ============================================================================
 * Manages user roles (USER, DOCTOR, ADMIN), session persistence in localStorage,
 * and page route protection.
 */

const AUTH_KEY = "mytrm_session";

function getCurrentSession() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setSession(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(AUTH_KEY);
}

function logout() {
  clearSession();
  showToast("Logged out successfully");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 400);
}

function protectRoute(allowedRoles = []) {
  const session = getCurrentSession();
  const currentPath = window.location.pathname.split("/").pop();

  if (!session) {
    if (allowedRoles.length > 0) {
      showToast("Please log in to access this page", "warning");
      window.location.href = `login.html?redirect=${encodeURIComponent(currentPath)}`;
    }
    return;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    showToast("Access Denied: Unauthorized role", "warning");
    if (session.role === "ADMIN") {
      window.location.href = "admin-dashboard.html";
    } else if (session.role === "DOCTOR") {
      window.location.href = "doctor-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }
  }
}

function updateNavForSession() {
  const session = getCurrentSession();
  const navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  const waNumber = typeof MYTRM_WHATSAPP_NUMBER !== "undefined" ? MYTRM_WHATSAPP_NUMBER : "919876543210";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent("Hi MYTRM, I have a question about your therapy services.")}`;

  let authBtnHTML = `<a href="login.html" class="btn-pill-primary">Sign In</a>`;

  if (session) {
    let dashboardLink = "dashboard.html";
    if (session.role === "ADMIN") {
      dashboardLink = "admin-dashboard.html";
    } else if (session.role === "DOCTOR") {
      dashboardLink = "doctor-dashboard.html";
    }

    const displayName = session.name ? session.name : "Account";

    authBtnHTML = `
      <div class="nav-item">
        <button class="user-nav-btn">
          <span style="width: 8px; height: 8px; background: var(--color-primary); border-radius: 50%;"></span>
          ${displayName} ▾
        </button>
        <div class="nav-dropdown" style="right: 0; left: auto; min-width: 180px;">
          <a href="${dashboardLink}" class="dropdown-item">My Dashboard</a>
          <button onclick="logout()" class="dropdown-item" style="color: #D32F2F; border: none; background: none; text-align: left; width: 100%; cursor: pointer;">Log Out</button>
        </div>
      </div>
    `;
  }

  navActions.innerHTML = `
    <!-- Phone Support Tooltip -->
    <div class="phone-popover-wrapper">
      <a href="tel:+9118008906987" class="phone-icon-btn" aria-label="Call support">📞</a>
      <div class="phone-popover">
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary); uppercase;">24/7 Helpline</div>
        <div style="font-weight: 700; color: var(--color-text-main); margin-top: 0.2rem;">+91 1800-890-MYTRM</div>
        <div style="font-size: 0.775rem; color: var(--color-text-subtle); margin-top: 0.3rem;">Toll-free student & client line</div>
      </div>
    </div>

    <!-- General WhatsApp Circle Button -->
    <a href="${waUrl}" target="_blank" class="nav-wa-btn" title="Chat with MYTRM Support on WhatsApp">
      <img src="assets/icons/whatsapp.svg" alt="WhatsApp" style="width: 24px; height: 24px; display: block;" />
    </a>

    <!-- Auth Pill Button or Logged-In User Menu -->
    ${authBtnHTML}

    <!-- Mobile Drawer Hamburger -->
    <button class="mobile-toggle" aria-label="Toggle drawer">☰</button>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavForSession();
});
