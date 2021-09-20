import { store } from 'react-notifications-component'

const messageAdder = (data) => {
  store.addNotification({
    title: data.title,
    message: data.message,
    type: data.type,
    container: "center",
    dismiss: {
        duration: 2000,
        onScreen: true
    },
    animationIn: ["animate__animated animate__fadeIn"]
})
}

export default messageAdder
