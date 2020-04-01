import React from 'react';
const ToastNotification = (props) => {
    return (
        <>
            <div class={'alert alert-' + props.alert_type} role="alert">
                <button class="close" type="button" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-cog fa-spin"></i>{props.content}
            </div>
        </>
    )
}
export default ToastNotification;