-- Вставка тестовых пользователей
INSERT INTO users (first_name, last_name, email, password_hash, phone_number, address, created_at)
VALUES
    ('John', 'Doe', 'john.doe@example.com', 'hashed_password', '1234567890', '123 Main St', CURRENT_TIMESTAMP),
    ('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password', '0987654321', '456 Elm St', CURRENT_TIMESTAMP);

-- Вставка тестовых категорий
INSERT INTO categories (type, description)
VALUES
    ('Стулья', 'Описание раздела стульев'),
    ('Диваны', 'Описание раздела диванов'),
    ('Столы', 'Описание раздела столов');

-- Вставка тестовых товаров
INSERT INTO products (category_id, name, description, price, image_url)
VALUES
    (
        (SELECT category_id FROM categories WHERE type = 'Стулья' LIMIT 1),
        'Стул Офисный',
        'Удобный офисный стул',
        199.99,
        'http://example.com/chair.jpg'
    ),
    (
        (SELECT category_id FROM categories WHERE type = 'Диваны' LIMIT 1),
        'Диван Угловой',
        'Простой угловой диван',
        599.99,
        'http://example.com/sofa.jpg'
    ),
    (
        (SELECT category_id FROM categories WHERE type = 'Столы' LIMIT 1),
        'Стол Обеденный',
        'Качественный обеденный стол',
        299.99,
        'http://example.com/table.jpg'
    );

-- Вставка корзин для пользователей
INSERT INTO carts (user_id)
VALUES
    ((SELECT user_id FROM users WHERE email = 'john.doe@example.com' LIMIT 1)),
    ((SELECT user_id FROM users WHERE email = 'jane.smith@example.com' LIMIT 1));

-- Вставка тестового заказа для пользователя John Doe
INSERT INTO orders (user_id, total_amount, created_at)
VALUES
    ((SELECT user_id FROM users WHERE email = 'john.doe@example.com' LIMIT 1), 199.99, CURRENT_TIMESTAMP);

-- Вставка позиций заказа (связь заказа с товаром)
INSERT INTO order_items (order_id, product_id, count, price)
VALUES
    (
        (SELECT order_id FROM orders WHERE user_id = (SELECT user_id FROM users WHERE email = 'john.doe@example.com' LIMIT 1) LIMIT 1),
        (SELECT product_id FROM products WHERE name = 'Стул Офисный' LIMIT 1),
        1,
        199.99
    );

-- Вставка позиций в корзину для пользователя Jane Smith
INSERT INTO cart_items (cart_id, product_id, count)
VALUES
    (
        (SELECT cart_id FROM carts WHERE user_id = (SELECT user_id FROM users WHERE email = 'jane.smith@example.com' LIMIT 1) LIMIT 1),
        (SELECT product_id FROM products WHERE name = 'Диван Угловой' LIMIT 1),
        1
    );