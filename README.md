# web-app-WYWM
WYWM Github web application


Database SQL perameters

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying NOT NULL
);
-- Insert test data

INSERT INTO public.categories (category_name) VALUES ('Bike')
INSERT INTO public.categories (category_name) VALUES ('Scooter')
INSERT INTO public.categories (category_name) VALUES ("Skateboard")


CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_category_id integer NOT NULL,
    product_name character varying NOT NULL,
    product_price double precision NOT NULL,
    product_quantity integer NOT NULL,
    product_sold integer NOT NULL,
    product_image character varying
);
-- Insert test data

INSERT INTO public.products (product_id, product_category_id, product_name, product_price, product_quantity, product_sold, product_image) VALUES (2, 1, 'Street Bike', 299.99, 8, 5, 'https://www.sefiles.net/merchant/91/images/site/giant_defy_composite_3_compact_12_z-slimC.jpg?t=1517345073613');
INSERT INTO public.products (product_id, product_category_id, product_name, product_price, product_quantity, product_sold, product_image) VALUES (3, 1, 'Exercise Bike', 69.99, 9, 5, 'https://cdn.shopify.com/s/files/1/2017/5577/products/DSC_0892copy_700x700.jpg?v=1640175849');
INSERT INTO public.products (product_id, product_category_id, product_name, product_price, product_quantity, product_sold, product_image) VALUES (4, 1, 'Electric Bike', 399.99, 10, 2, 'https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/a/s/assist.png');
INSERT INTO public.products (product_id, product_category_id, product_name, product_price, product_quantity, product_sold, product_image) VALUES (5, 2, 'Scooter', 39.99, 7, 11, 'https://m.media-amazon.com/images/I/51CE5b7DaLL._AC_SY450_.jpg');
INSERT INTO public.products (product_id, product_category_id, product_name, product_price, product_quantity, product_sold, product_image) VALUES (6, 2, 'Electric Scooter', 369.99, 5, 3, 'https://personalelectrictransport.co.uk/wp-content/uploads/2022/09/Motorun-PET-e-scooter-PET-London-6.jpg');
INSERT INTO public.products (product_id, product_category_id, product_name, product_price, product_quantity, product_sold, product_image) VALUES (7, 3, 'Skateboard', 59.99, 3, 12, 'https://media.4rgos.it/i/Argos/9495496_R_Z002A?w=750&h=440&qlt=70');
INSERT INTO public.products (product_id, product_category_id, product_name, product_price, product_quantity, product_sold, product_image) VALUES (1, 1, 'Mountain Bike', 249.99, 19, 7, 'https://m.media-amazon.com/images/I/71IbKJBiB-L._AC_SL1500_.jpg');
