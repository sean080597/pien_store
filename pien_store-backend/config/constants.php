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
    'MSG'=> [
        'ERROR' => [
            'EXIST_EMAIL' => 'This email already exist please try another email',
            'ONLY_IMG_TYPE' => 'Only png, jpg and jpeg files are accepted for setting profile pictures',
            'INVALID_ID' => 'Please this content has no valid id',
            'NOT_FOUND' => 'Not Found'
        ],
        'SUCCESS' => [
            'LOGOUT' => 'Successfully logged out',
            'PRODUCT_CREATED' => 'Product created successfully',
            'PRODUCT_UPDATED' => 'Product updated successfully',
            'PRODUCT_DELETED' => 'Product deleted successfully',
            'CATEGORY_CREATED' => 'Category created successfully',
            'CATEGORY_UPDATED' => 'Category updated successfully',
            'CATEGORY_DELETED' => 'Category deleted successfully'
        ]
    ],
];