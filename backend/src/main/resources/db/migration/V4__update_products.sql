-- Обновление URL изображений для товаров
UPDATE products
SET image_url = CASE
    WHEN name = 'Стул Офисный' THEN 'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/2751e763-ffef-4ea1-9c0a-e7cdd955f440.jpeg'
    WHEN name = 'Диван Угловой' THEN 'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/4551ca3b-1db8-498a-980c-afab89ef2e1f.jpeg'
    WHEN name = 'Стол Обеденный' THEN 'https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/50072ac7-7d8e-41e8-a642-aa35d8b9961b.jpeg'
END
WHERE name IN ('Стул Офисный', 'Диван Угловой', 'Стол Обеденный'); 

-- Обновление названия дивана
UPDATE products
SET name = 'Диван Комфорт'
WHERE name = 'Диван Угловой'; 

UPDATE products
SET name = 'Стул Деревянный'
WHERE name = 'Стул Офисный'; 