<?php

return [
    'ADMIN_NAME' => 'administrator',
    'ROLE' => [
        'adm' => 'admin',
        'mgr' => 'manager',
        'stf' => 'staff',
        'cus' => 'customer'
    ],
    'LOGIN_TYPE' => [
        'rg' => 'registered',
        'gg' => 'google',
        'fb' => 'facebook'
    ],
    'ORDER_STATUS' => [
        'CANCELED' => 'CANCELED',
        'DELIVERING' => 'DELIVERING',
        'DELIVERED' => 'DELIVERED',
        'RECEIVED' => 'RECEIVED',
        'PENDING' => 'PENDING',
        'PROCESSING' => 'PROCESSING'
    ],
    'MSG'=> [
        'ERROR' => [
            'EXIST_EMAIL' => 'This email already exist please try another email',
            'INVALID_ID' => 'Please this content has no valid id',
            'NOT_FOUND' => 'Not Found',
            'ONLY_IMG_TYPE' => 'Only png, jpg and jpeg files are accepted for setting profile pictures',
            'FORBIDDEN' => 'FORBIDDEN',
        ],
        'SUCCESS' => [
            'CATEGORY_CREATED' => 'Category created successfully',
            'CATEGORY_DELETED' => 'Category deleted successfully',
            'CATEGORY_UPDATED' => 'Category updated successfully',
            'LOGOUT' => 'Successfully logged out',
            'ORDER_CONFIRMED' => 'Order is saved',
            'ORDER_UPDATED' => 'Order is updated',
            'PRODUCT_CREATED' => 'Product created successfully',
            'PRODUCT_DELETED' => 'Product deleted successfully',
            'PRODUCT_UPDATED' => 'Product updated successfully',
            'SHIPMENT_DETAILS_CREATED' => 'Shipment details created successfully',
            'SHIPMENT_DETAILS_DELETED' => 'Shipment details deleted successfully',
            'SHIPMENT_DETAILS_EDITED' => 'Shipment details edited successfully',
            'USERINFO_UPDATED' => 'User information updated successfully',
            'USER_CREATED' => 'User Account created successfully',
            'USER_DELETED' => 'User Account deleted successfully'
        ]
    ]
];