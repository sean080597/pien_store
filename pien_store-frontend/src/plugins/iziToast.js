import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

iziToast.settings({
    timeout: 1500,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    progressBar: false,
    position: "topRight",
    drag: false,
    close: false
});