<template>
  <MobileOnlyWrapper>
    <div class="relative h-screen w-full overflow-hidden">
      <img
        src="../../assets/bg-staff.jpg"
        alt="Kadinova Logo"
        class="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <!-- Optional overlay to make text more readable -->
      <div class="absolute top-0 left-0 w-full h-full bg-opacity-50 z-10"></div>

      <!-- Content -->
      <div
        class="relative z-20 flex items-center justify-center h-full w-full shadow-md"
      >
        <div
          class="max-w-80 w-full mx-auto bg-white/5 backdrop-blur-sm rounded-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] p-8"
        >
          <img
            src="../../assets/logo.png"
            alt="Kadinova Logo"
            class="w-14 mx-auto mb-2"
          />
          <h1 class="text-2xl md:text-2xl text-center font-bold text-white">
            Sign in to RAPIMNAS Staff
          </h1>
          <p class="text-center text-white mb-5">
            Silakan masuk menggunakan akun yang telah terdaftar
          </p>
          <div id="buttonDiv" class="w-full flex justify-center"></div>
        </div>
      </div>
    </div>
  </MobileOnlyWrapper>
</template>

<script setup>
import Swal from "sweetalert2";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
// const navigate = useNavigate();
const config = useRuntimeConfig();
const router = useRouter();
async function handleCredentialResponse(response) {
  // console.log("Encoded JWT ID token: " + response.credential);
  const googleToken = response.credential;
  // console.log(googleToken, "<<<<<<<<<<<< GOOGLE TOKEN");
  try {
    const response = await $fetch(`${config.public.BaseUrl}/user/google`, {
      method: "POST",
      body: JSON.stringify({ googleToken }),
    });
    // console.log(response, "response login");
    if (response.access_token) {
      // await storeCookie.set("archive_token", response.access_token);

      await Swal.fire({
        title: "Welcome back! ",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-primary text-white hover:bg-dprimary transition-colors duration-200 rounded-lg",
        },
      }).then(() => {
        // Redirect setelah tombol OK diklik
        if (jwtDecode(response.access_token).privilage === "TenagaAhli") {
          router.push("/archive/ta-dashboard");
        } else {
          router.push("/archive/dashboard");
        }
      });
    }
    // router.push("/archive/dashboard");
  } catch (error) {
    // console.log(error);
    Swal.fire({
      title: "Login Failed",
      text: "Please try again.",
      icon: "error",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-primary text-white hover:bg-dprimary transition-colors duration-200 rounded-lg",
      },
    });
  }
}
const loadGoogleScript = () => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  // console.log(config,'ini configny  ')
  // console.log(config.public.GoogleClient,'ini google client');

  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: `${config.public.GoogleClient}`, // ini masih hardcode client id rahma ya hehe
      callback: handleCredentialResponse,
    });
    // Initialize the responsive button instead of direct render
    initializeGoogleButton();
    window.google.accounts.id.prompt();
  };

  script.onerror = () => {
    console.error("Failed to load Google Identity Services script.");
  };
};

// Function to handle button width based on screen size
function initializeGoogleButton() {
  const buttonDiv = document.getElementById("buttonDiv");

  // Function to update button width
  function updateButtonWidth() {
    // Get current window width
    const windowWidth = window.innerWidth;

    // Check if screen width is below 640px (sm breakpoint)
    const buttonWidth = windowWidth < 768 ? "240px" : "400px";

    // Clear existing button
    buttonDiv.innerHTML = "";

    // Render new button with updated width
    window.google.accounts.id.renderButton(buttonDiv, {
      theme: "outline",
      size: "large",
      width: buttonWidth,
    });
  }

  // Initial render
  updateButtonWidth();

  // Add resize listener
  window.addEventListener("resize", function () {
    // Debounce the resize event to prevent too many re-renders
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(updateButtonWidth, 200);
  });
}

onMounted(() => {
  loadGoogleScript();
});
</script>
