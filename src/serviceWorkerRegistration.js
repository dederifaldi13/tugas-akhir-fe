// / This optional code is used to register a service worker.
// register() is not called by default.

import Swal from "sweetalert2";
// import { getUserdata, logout } from "./components/helpers/function";
// import { ToastNotification } from "./components/helpers/notification";
import metadata from './metadata.json'
import { PopUpAlert } from "./setup";

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js?v=${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          // console.log(
          //   "This web app is being served cache-first by a service " +
          //     "worker. To learn more, visit https://cra.link/PWA"
          // );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}
//Halo
function registerValidSW(swUrl, config) {
  // console.log(config)
  // console.log(swUrl)
  // console.log("Go")
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      const registrationWaiting = registration.waiting;
      // console.log(registration.waiting?.state)
      if(registration.waiting?.state === "installed"){
        registrationWaiting.postMessage({ type: "SKIP_WAITING" });
        registrationWaiting.addEventListener("statechange", (e) => {
          if (e.target.state === "activated") {
            // ToastNotification('success','update new version')
            PopUpAlert.default.AlertSuccess('update new version')
            // if(getUserdata().user_id === undefined){
            //   setTimeout(() => {
            //     window.location.reload();
            //   }, 1000);
            // }else{
            //   console.log('masuk atas')
            //   logout(getUserdata().user_id)
            // }
          }
        });
      }
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        const registrationWaiting = registration.waiting;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
          
              Swal.fire({
                text: "Update Tersedia, Silahkan Tutup Tab Halaman ini dan buka kembali",
                icon: "info",
                showConfirmButton: true,
                position: "center",
                allowEscapeKey: false,
                allowOutsideClick: false,
                allowEnterKey: false,
                // footer:
                //   '<a href="https://tokomaskresno.netlify.app">Klik untuk buka halaman baru</a>',
              }).then((res) => {
                if (res.isConfirmed) {
                  registrationWaiting.postMessage({ type: "SKIP_WAITING" });
                  registrationWaiting.addEventListener("statechange", (e) => {
                    if (e.target.state === "activated") {
                      console.log(e);
                    //   if(getUserdata().user_id === undefined){
                    //     setTimeout(() => {
                    //       window.location.reload();
                    //     }, 1000);
                    //   }else{
                    //  console.log('masuk bawah')
                    //     logout(getUserdata().user_id)
                    //   }
                    }
                  });
                }
              });
              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              // console.log("Content is cached for offline use.");

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      // console.log(
      //   "No internet connection found. App is running in offline mode."
      // );
    });
}

export function forceSWupdate() {
  let config =  {
    onUpdate: (registration) => {
      const waitingServiceWorker = registration.waiting;
  
      if (waitingServiceWorker) {
        waitingServiceWorker.addEventListener("statechange", (event) => {
          if (event.target.state === "activated") {
            window.location.reload();
          }
        });
        waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
      }
    },
  }
  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  // console.log(swUrl)
  registerValidSW(swUrl, config);
}
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
