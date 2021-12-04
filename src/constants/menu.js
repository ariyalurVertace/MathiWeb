export const menu = [
  {
    id: "user",
    icon: "bx bx-user-circle",
    label: "user",
    to: "/user",
    badge: "no",
  },{
    id: "state",
    icon: "bx bx-globe",
    label: "state",
    to: "/state",
    badge: "no",
  },
  {
    id: "System",
    icon: "bx bx-list-ol",
    label: "System Master",
    to: "/feedback",
    subs: [
      {
        id: "ApiModule",
        icon: "bx bx-list-ol",
        label: "API Module",
        to: "/api-module",
        badge: "no",
      },
      {
        id: "Role",
        icon: "fas fa-qrcode",
        label: "Role",
        to: "/role",
      },

    ]
  },
  {
    id: "Feedback",
    icon: "fas fa-comment",
    label: "Feedback",
    to: "/feedback",
    subs: [

      {
        id: "feedback",
        icon: "fas fa-comment",
        label: "Feedback",
        to: "/feedback",
        badge: "no",
      },
      {
        id: "feedbacktype",
        icon: "fas fa-list-alt",
        label: "Feedback Type",
        to: "/feedback-type",
        badge: "no",
      },

    ]
  },
  
  {
    id: "E-Beat",
    icon: "fas fa-qrcode",
    label: "E-Beat",
    to: "/e-beat-location-type",
    subs: [
      {
        id: "EBeatLocationType",
        icon: "fas fa-qrcode",
        label: "E-Beat Location",
        to: "/e-beat-location",
        badge: "no",
      },
      {
        id: "EBeatLocationType",
        icon: "fas fa-qrcode",
        label: "E-Beat Location Type",
        to: "/e-beat-location-type",
        badge: "no",
      },

    ]
  },

  {
    id: "WelFar",
    icon: "fas fa-book-reader",
    label: "Welfare",
    to: "/",
    subs: [
      {
        id: "Request",
        icon: "bx bx-share-alt",
        label: "Request Type",
        to: "/request-type",
        badge: "no",
      },
    
      {
        id: "Deparments",
        icon: "bx bx-map-alt",
        label: "Department",
        to: "/department",
        badge: "no",
      },

      
    ]
  },


  {
    id: "Reachme",
    icon: "fas  fa-child",
    label: "ReachMe",
    to: "/",
    subs: [
      {
        id: "RequestType",
        icon: "fas fa-child",
        label: "Request Type",
        to: "/reachme-request-type",
        badge: "no",
      },
      

    ]
  },



 
]
