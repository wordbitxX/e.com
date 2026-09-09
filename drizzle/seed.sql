-- Veranne demonstration seed data.
-- Reviews are flagged is_demo = true and are never used to build an aggregate
-- rating or emitted in structured data.

DELETE FROM reviews WHERE is_demo = true;

INSERT INTO reviews (product_slug, author_name, location, rating, title, body, is_demo, verified) VALUES
('aveline-structured-tote','Sample note','Copenhagen',5,'It holds its own shape','The unlined interior was the detail I doubted and now it is the reason I reach for it. Four months in and the corners have softened exactly as described.',true,false),
('aveline-structured-tote','Sample note','Toronto',4,'Heavier than expected','Genuinely substantial leather — worth knowing before you buy. Fits a 14 inch laptop with room for a folio.',true,false),
('odette-cashmere-sweater','Sample note','Lisbon',5,'Sized down and it was right','Took the concierge suggestion and sized down. The shoulder sits exactly where I wanted it to.',true,false),
('odette-cashmere-sweater','Sample note','Melbourne',5,'No pilling so far','Six washes by hand and the surface still looks new. The rib has not stretched at the cuff.',true,false),
('marin-card-holder','Sample note','Berlin',5,'The one I keep replacing badly','Bought two, gave one away and immediately regretted it. It has taken the curve of my pocket already.',true,false),
('terra-hand-thrown-vase','Sample note','Kyoto',5,'No two are alike','Mine pooled greener than the photograph and that is precisely the appeal. Three branches look composed in it.',true,false),
('ember-no-4-eau-de-parfum','Sample note','London',4,'Close to the skin','Not a room-filler, which is what I wanted. The iris comes forward after about an hour.',true,false),
('sable-cashmere-wrap','Sample note','New York',5,'Bought a second one','One to keep, one to give. The brushed surface is softer than anything else I own.',true,false),
('vesper-scented-candle','Sample note','Dubai',5,'Kept the vessel','Burned evenly to the edge on the first light. The stoneware now holds brushes on my desk.',true,false),
('solene-signet-ring','Sample note','Paris',5,'Weighted properly','Solid gold makes the difference — it sits still on the finger instead of spinning.',true,false),
('halden-cashmere-crewneck','Sample note','Amsterdam',4,'Genuinely thin','Disappears under a jacket exactly as described. Opaque in clay, slightly less so in ivory.',true,false),
('filo-chain-necklace','Sample note','Milan',5,'Lies flat','The filed links mean it does not roll at the collarbone. Clasp is easy one-handed.',true,false);

-- Demonstration orders so the tracking timeline can be explored without checking out.
DELETE FROM order_events WHERE order_id IN (SELECT id FROM orders WHERE order_number IN ('VRN-DEMO01','VRN-DEMO02'));
DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE order_number IN ('VRN-DEMO01','VRN-DEMO02'));
DELETE FROM orders WHERE order_number IN ('VRN-DEMO01','VRN-DEMO02');

INSERT INTO orders (order_number, email, first_name, last_name, phone, address_line1, city, region, postal_code, country,
  shipping_method, shipping_label, shipping_cents, payment_method, payment_reference,
  subtotal_cents, discount_cents, tax_cents, total_cents, currency, gift_wrap, status, estimated_delivery, created_at)
VALUES
('VRN-DEMO01','demo@veranne.studio','Aurelie','Marchand','+33 1 55 00 00 00','12 Rue des Archives','Paris','Île-de-France','75004','France',
 'express','Express delivery',1800,'card','MOCK-DEMO0001',
 96000,0,0,97800,'USD',false,'shipped','Thu 12 Feb – Fri 13 Feb', NOW() - INTERVAL '3 days'),
('VRN-DEMO02','demo2@veranne.studio','Idris','Rahman','+971 4 555 0000','Villa 8, Al Wasl Road','Dubai',NULL,'00000','United Arab Emirates',
 'standard','Standard delivery',0,'cod','MOCK-DEMO0002',
 30500,3050,0,27450,'USD',true,'delivered','Delivered', NOW() - INTERVAL '11 days');

INSERT INTO order_items (order_id, product_slug, product_name, variant_label, size_label, sku, image_url, unit_price_cents, quantity, line_total_cents)
SELECT id,'aveline-structured-tote','Aveline Structured Tote','Warm Tan','One size','VRN-LG-101',
  'https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200',68000,1,68000
FROM orders WHERE order_number = 'VRN-DEMO01';

INSERT INTO order_items (order_id, product_slug, product_name, variant_label, size_label, sku, image_url, unit_price_cents, quantity, line_total_cents)
SELECT id,'sable-cashmere-wrap','Sable Cashmere Wrap','Oat','One size','VRN-CK-210',
  'https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200',28000,1,28000
FROM orders WHERE order_number = 'VRN-DEMO01';

INSERT INTO order_items (order_id, product_slug, product_name, variant_label, size_label, sku, image_url, unit_price_cents, quantity, line_total_cents)
SELECT id,'terra-hand-thrown-vase','Terra Hand-Thrown Vase','Ash','One size','VRN-CH-401',
  'https://images.pexels.com/photos/6944537/pexels-photo-6944537.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200',22000,1,22000
FROM orders WHERE order_number = 'VRN-DEMO02';

INSERT INTO order_items (order_id, product_slug, product_name, variant_label, size_label, sku, image_url, unit_price_cents, quantity, line_total_cents)
SELECT id,'mirena-bud-vase','Mirena Bud Vase','Bone','One size','VRN-CH-408',
  'https://images.pexels.com/photos/11410238/pexels-photo-11410238.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200',8500,1,8500
FROM orders WHERE order_number = 'VRN-DEMO02';

INSERT INTO order_events (order_id, stage, label, note, completed, occurred_at, position)
SELECT o.id, s.stage, s.label, s.note,
  CASE WHEN s.position <= 3 THEN true ELSE false END,
  CASE WHEN s.position <= 3 THEN NOW() - ((3 - s.position) || ' days')::interval ELSE NULL END,
  s.position
FROM orders o
CROSS JOIN (VALUES
  ('placed','Order placed','We have your order and payment intent.',0),
  ('confirmed','Confirmed','Reserved from atelier stock.',1),
  ('packed','Packed','Wrapped in tissue and sealed with the atelier mark.',2),
  ('shipped','Shipped','Handed to the carrier with tracking.',3),
  ('out_for_delivery','Out for delivery','With the courier in your city.',4),
  ('delivered','Delivered','Signed for at the delivery address.',5)
) AS s(stage,label,note,position)
WHERE o.order_number = 'VRN-DEMO01';

INSERT INTO order_events (order_id, stage, label, note, completed, occurred_at, position)
SELECT o.id, s.stage, s.label, s.note, true,
  NOW() - ((11 - s.position) || ' days')::interval,
  s.position
FROM orders o
CROSS JOIN (VALUES
  ('placed','Order placed','We have your order and payment intent.',0),
  ('confirmed','Confirmed','Reserved from atelier stock.',1),
  ('packed','Packed','Wrapped in tissue and sealed with the atelier mark.',2),
  ('shipped','Shipped','Handed to the carrier with tracking.',3),
  ('out_for_delivery','Out for delivery','With the courier in your city.',4),
  ('delivered','Delivered','Signed for at the delivery address.',5)
) AS s(stage,label,note,position)
WHERE o.order_number = 'VRN-DEMO02';
