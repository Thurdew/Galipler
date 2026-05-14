-- ============================================================
-- Galipler Yapı Malzemeleri – Supabase Schema
-- Supabase SQL Editor'a yapıştırıp çalıştırın
-- ============================================================

-- PRODUCTS tablosu
CREATE TABLE IF NOT EXISTS products (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  short_description TEXT,
  paragraphs      JSONB DEFAULT '[]',
  usage_areas     JSONB DEFAULT '[]',
  price           NUMERIC DEFAULT 0,
  image           TEXT,
  category        TEXT,
  in_stock        BOOLEAN DEFAULT TRUE,
  meta_title      TEXT,
  meta_description TEXT
);

-- BLOG_POSTS tablosu
CREATE TABLE IF NOT EXISTS blog_posts (
  id              TEXT PRIMARY KEY,
  date            TIMESTAMPTZ DEFAULT NOW(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  excerpt         TEXT,
  content         TEXT,
  author          TEXT,
  tags            JSONB DEFAULT '[]',
  og_image        TEXT,
  meta_title      TEXT,
  meta_description TEXT
);

-- RLS devre dışı (kimlik doğrulama Express katmanında yapılıyor)
ALTER TABLE products  DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- SEED: Mevcut ürün verileri
-- ============================================================

INSERT INTO products (id, name, slug, short_description, paragraphs, usage_areas, price, image, category, in_stock, meta_title, meta_description) VALUES
('1', 'Ferforje', 'ferforje', 'Dekoratif ve işlevsel ferforje demir ürünleri. Kapı, pencere parmaklığı ve bahçe uygulamalarında kullanılır.',
 '["Ferforje, estetik görünümünü dayanıklılıkla birleştiren, yüksek kaliteli çelikten üretilen yapı ve dekorasyon malzemesidir. Galipler Yapı Malzemeleri olarak sunduğumuz ferforje ürünleri, geleneksel imalat anlayışı ile modern tasarımın buluşma noktasında şekillenmektedir. Her parçada onlarca yıl boyunca sağlam durabilecek bir kalite güvencesi taşınmaktadır.", "Isıya dayanıklı yüzey kaplaması ve özel boyama işlemleri sayesinde dış hava koşullarına karşı üstün koruma sunan ferforje ürünlerimiz, kapı ve pencere parmaklıklarından bahçe çitlerine, balkon korkuluklarından merdiven trabzanlarına kadar geniş bir kullanım alanına sahiptir. Kırsal ve kentsel mimari projelerinde sıkça tercih edilen bu malzeme, mekânlara özgün bir karakter katmaktadır.", "1972''den bu yana sektörde güvenilir bir tedarikçi olarak hizmet veren firmamız, standart ürün gamının yanı sıra projeye özel ferforje tasarım çözümleri de sunmaktadır. Geniş stok altyapımız ve deneyimli ekibimiz sayesinde bireysel ve kurumsal müşterilerimizin taleplerine hızlı biçimde yanıt veriyoruz."]',
 '["Kapı ve pencere parmaklıkları", "Bahçe çitleri ve kapıları", "Balkon ve teras korkulukları", "Merdiven trabzan ve korkulukları", "Dekoratif panel ve süs elemanları", "Şömine ekranları"]',
 0, '/images/11.jpg', 'Demir Ürünleri', TRUE,
 'Ferforje Ürünleri | Galipler Yapı Malzemeleri',
 'Kapı, parmaklık ve bahçe uygulamaları için dayanıklı ferforje çelik ürünleri. İstanbul Ataşehir''de kaliteli ferforje çözümleri için Galipler''i arayın.'),

('2', 'Köşebent', 'kosebent', 'Yapı ve endüstriyel uygulamalar için yüksek kaliteli çelik köşebent profiller.',
 '["Köşebent, inşaat ve sanayi projelerinin vazgeçilmez taşıyıcı elemanlarından biridir. L kesitli bu çelik profil, yük taşıma kapasitesi ve montaj kolaylığı sayesinde hem yapısal hem de bağlantı elemanı olarak geniş bir kullanım alanı bulmaktadır. Galipler Yapı Malzemeleri, farklı et kalınlığı ve kanat genişliğine sahip köşebent çeşitlerini geniş stok mevcudu ile sunmaktadır.", "Yüksek dayanımlı çelik alaşımından üretilen köşebentlerimiz; raf ve depolama sistemlerinden çelik konstrüksiyona, kapı-pencere çerçevelerinden köşe takviye elemanlarına kadar her türlü projeye uyum sağlamaktadır. Standart siyah çelik seçeneklerinin yanı sıra galvanizli ve boyalı yüzey seçenekleriyle korozyon koruması da sağlanabilmektedir.", "Firmamız, 50 yılı aşkın deneyimiyle tedarik ettiği köşebent ürünlerinde boyuta özgü kesim ve delik işleme gibi katma değerli hizmetler de sunmaktadır. Toplu alımlarda rekabetçi fiyat avantajı için WhatsApp hattımızdan teklif alabilirsiniz."]',
 '["Çelik konstrüksiyon taşıyıcı sistemler", "Raf ve depolama sistemleri", "Kapı ve pencere çerçeve takviyesi", "Köşe bağlantı ve takviye elemanları", "Makine imalatı ve ekipman çerçeveleri", "Mobilya ve metal aksesuar üretimi"]',
 0, '/images/13.jpg', 'Profil Ürünleri', TRUE,
 'Köşebent Çelik Profil | Galipler Yapı Malzemeleri',
 'İnşaat ve sanayi için her boyut ve kalınlıkta çelik köşebent profiller. İstanbul Ataşehir''de stoktan teslim, uygun fiyatlı köşebent tedariki.'),

('3', 'Sac', 'sac', 'Düz ve oluklu sac çeşitleri. Her türlü endüstriyel ve yapısal uygulama için.',
 '["Çelik sac, modern endüstriyel üretimin ve inşaatın temel hammaddelerinden biri olarak kabul görmektedir. Galipler Yapı Malzemeleri; düz sac, oluklu sac ve özel yüzey işlemli sac seçeneklerini geniş bir et kalınlığı aralığında stokta tutmaktadır. Soğuk ve sıcak haddelenmiş seçenekler, projenin gereksinimlerine göre doğru malzemeyi seçme esnekliği sunmaktadır.", "Yüksek gerilme dayanımına sahip sac ürünlerimiz; makine kasaları, tank ve depo imalatı, çatı kaplamaları ile cephe panelleri gibi ağır yük gerektiren uygulamalarda güvenle kullanılmaktadır. Galvanizli sac seçeneklerimiz ise nem ve korozyon koşullarına maruz kalan alanlarda uzun ömürlü çözüm sağlamaktadır.", "Firmamız, ihtiyacınıza özel sac kesimi, bükme ve delik açma işlemlerini de gerçekleştirmektedir. Küçük projelerden büyük ölçekli endüstriyel tedarike kadar her talebi karşılayabilecek kapasite ve stok altyapısına sahibiz."]',
 '["Makine imalatı ve ekipman kasaları", "Tank, depo ve silo yapımı", "Çatı ve cephe kaplama uygulamaları", "Otomotiv ve taşımacılık sektörü", "Endüstriyel platform ve döşeme", "Kapı, panel ve bölme sistemleri"]',
 0, '/images/9.jpg', 'Sac Ürünleri', TRUE,
 'Çelik Sac | Galipler Yapı Malzemeleri',
 'Düz, oluklu ve galvanizli çelik sac çeşitleri. Endüstriyel ve yapısal projeler için geniş et kalınlığı seçenekleriyle Galipler''den sac tedariki.'),

('4', 'İşlemeli Profil', 'islemeli-profil', 'Özel işlemeli çelik profiller. Endüstriyel ve dekoratif uygulamalar için idealdir.',
 '["İşlemeli profil, standart çelik profillerin özel frezeleme, delme veya şekillendirme işlemleriyle projeye hazır hale getirilmiş halidir. Galipler Yapı Malzemeleri, geniş profil stoğu ve işleme ekipmanlarıyla hem standart hem de özel ölçülü işlemeli profil tedariki konusunda deneyimli bir çözüm ortağıdır.", "Yapı cephelerinden iç mekân dekorasyon uygulamalarına, çelik konstrüksiyon çatılardan bölme duvar sistemlerine kadar geniş bir alanda kullanılan işlemeli profiller; montaj süresini kısaltır ve işçilik maliyetini düşürür. Her profil, müşteri tarafından belirlenen teknik çizime uygun olarak işlendiğinden saha uyumu mükemmeldir.", "Firmamızın 50 yılı aşkın sektör tecrübesi, işlemeli profil seçimi konusunda da müşterilerimize doğru malzeme danışmanlığı yapabilme imkânı sunmaktadır. Proje bazlı toplu siparişlerde rekabetçi fiyat ve hızlı teslimat avantajından yararlanmak için bizimle iletişime geçin."]',
 '["Bina cephesi ve dış kaplama sistemleri", "İç mekân dekoratif yapı elemanları", "Balkon ve teras taşıyıcı sistemleri", "Çelik konstrüksiyon çatı ve iskelet", "Bölme duvar ve asma tavan çerçeveleri", "Endüstriyel makine ve ekipman gövdeleri"]',
 0, '/images/2.jpg', 'Profil Ürünleri', TRUE,
 'İşlemeli Çelik Profil | Galipler Yapı Malzemeleri',
 'Projeye özel işlemeli çelik profil çözümleri. İnşaat, dekorasyon ve endüstriyel uygulamalar için Galipler''den kaliteli profil tedariki.'),

('5', 'Boru', 'boru', 'Çelik ve galvaniz boru çeşitleri. Yapı, tesisat ve endüstriyel kullanım için.',
 '["Çelik ve galvanizli boru, inşaat sektöründen enerji altyapısına, seracılıktan endüstriyel tesisata kadar pek çok kritik alanda kullanılan temel yapı malzemelerinden biridir. Galipler Yapı Malzemeleri; kare, dikdörtgen ve yuvarlak kesitli boru çeşitlerini farklı et kalınlığı ve boy seçenekleriyle stokta bulundurmaktadır.", "Galvanizli boru ürünlerimiz, açık alanda ve nem oranı yüksek ortamlarda yoğun kullanım gerektiren projelerde uzun ömürlü koruma sağlamaktadır. Seracılık, bahçe pergolası, çelik bina iskelet sistemleri ve taşıyıcı konstrüksiyon gibi uygulamalarda talep gören ürünlerimiz, yapısal dayanım testlerinden geçirilmiş kalite güvencesiyle tedarik edilmektedir.", "Bodrumdan çatıya her kottaki tesisat hatlarından fabrikalardaki ana boru altyapısına kadar geniş bir yelpazeye hitap eden boru ürünlerimizde ihtiyacınıza özel kesim ve işleme hizmeti de sunulmaktadır. Projenize uygun boru seçimi için uzman ekibimizden destek alabilirsiniz."]',
 '["Su, gaz ve ısıtma tesisatı", "Çelik bina iskelet ve taşıyıcı sistemler", "Sera, gölgelik ve pergola yapıları", "Demir doğrama ve ferforje uygulamaları", "Endüstriyel boru hatları ve manifoldlar", "Spor tesisi ve tribün konstrüksiyonu"]',
 0, '/images/5.jpg', 'Boru Ürünleri', TRUE,
 'Çelik ve Galvaniz Boru | Galipler Yapı Malzemeleri',
 'Kare, dikdörtgen ve yuvarlak çelik boru çeşitleri. Yapı, tesisat ve endüstriyel projeler için galvanizli boru Galipler Yapı Malzemeleri''nde.'),

('6', 'I Demiri', 'i-demiri', 'Yapı inşaatında taşıyıcı sistem olarak kullanılan yüksek dayanımlı I profil demirler.',
 '["I demiri, kesitinin I harfini andıran geometrik formu sayesinde yüksek eğilme ve kesme kuvvetlerine karşı üstün direnç gösteren yapısal çelik bir taşıyıcı elemandır. Binalarda, köprülerde ve endüstriyel yapılarda ana taşıyıcı kolon ve kiriş olarak kullanılan I profili, yük dağılımını en verimli biçimde sağlayan çelik profil türleri arasında yer almaktadır.", "Galipler Yapı Malzemeleri olarak sunduğumuz I demiri ürünleri, Türk Standartları''na uygun kalite belgeli çelik alaşımlarından üretilmektedir. Farklı flanş ve gövde yüksekliklerine sahip geniş ürün yelpazemiz; küçük çaplı ticari yapılardan ağır sanayi tesislerine, viadüktlerden fabrika çatı kirislerine kadar her ölçekteki projeye çözüm üretmektedir.", "Vinç kirişi ve ray taşıyıcı sistemi gibi dinamik yüklere maruz kalan uygulamalar da dahil olmak üzere I demiri kullanımı gerektiren her konuda deneyimli satış ekibimiz doğru profil boyutunu belirlemenize yardımcı olmaktadır. Büyük yükleme miktarları için özel fiyatlandırma ve teslimat planlaması yapılmaktadır."]',
 '["Bina taşıyıcı kolon ve kiriş sistemleri", "Köprü ve üst yapı konstrüksiyonu", "Fabrika, depo ve hangar çatıları", "Vinç kirişleri ve köprülü vinç rayları", "Çelik yapı çerçeve sistemleri", "Merdiven taşıyıcı ana kirişler"]',
 0, '/images/14.jpg', 'Demir Ürünleri', TRUE,
 'I Demiri – I Profil Çelik | Galipler Yapı Malzemeleri',
 'Yapı taşıyıcı sistemler için yüksek dayanımlı I profil demir. Farklı boy ve kalınlıklarda I demiri Galipler Yapı Malzemeleri''nde stokta.'),

('7', 'U Demiri', 'u-demiri', 'Endüstriyel uygulamalarda yaygın kullanılan U profil çelik ürünler.',
 '["U demiri (kanal profil), C ya da U şeklindeki kesit geometrisi sayesinde yüksek burulma ve eğilme direnci sunan yapısal çelik bir profildir. İnşaat sektöründe kolon-kiriş bağlantılarından endüstriyel tesislerdeki ray sistemlerine kadar geniş bir kullanım alanına sahip olan U profili, özellikle yük dağılımı gerektiren taşıyıcı çerçeve uygulamalarında tercih edilmektedir.", "Galipler Yapı Malzemeleri stoğundaki U demiri ürünleri; farklı flanş yüksekliği ve et kalınlığı seçenekleriyle küçük ölçekli metal imalat atölyelerinden büyük çaplı inşaat projelerine kadar her ihtiyaca hitap etmektedir. Standart siyah çelik seçeneklerinin yanı sıra galvanizli U profil de temin edilebilmektedir.", "Makas sistemi, konstrüksiyon çatı ve sanayi platform gibi kritik taşıyıcı uygulamalarda kullanacağınız U demirinin doğru boyutunu belirlemek için uzman ekibimizden teknik destek alabilirsiniz. Toplu alımlarda avantajlı fiyatlar için WhatsApp hattımızdan teklif almanızı öneririz."]',
 '["Çelik konstrüksiyon taşıyıcı çerçeveler", "Makine ve ekipman gövde çerçeveleri", "Ray ve kılavuz liderlik sistemleri", "İnşaat kalıp ve iskele sistemleri", "Endüstriyel raf ve depolama sistemleri", "Fabrika platform ve geçit döşemeleri"]',
 0, '/images/12.jpg', 'Demir Ürünleri', TRUE,
 'U Demiri – U Profil Çelik | Galipler Yapı Malzemeleri',
 'İnşaat ve sanayi için yüksek dayanımlı U profil çelik. Her boyut ve kalınlıkta U demiri Galipler Yapı Malzemeleri İstanbul Ataşehir''de.'),

('8', 'Trapez Sac', 'trapez-sac', 'Çatı ve cephe kaplama için trapez sac. Dayanıklı ve uzun ömürlü.',
 '["Trapez sac, profilli yüzey geometrisi sayesinde düz sacdan çok daha yüksek taşıma kapasitesi ve dayanıklılık sunan bir yapı örtü malzemesidir. Endüstriyel binalarda, depolarda, tarımsal yapılarda ve ticari tesislerde çatı ve cephe kaplaması amacıyla yaygın biçimde kullanılmaktadır. Galipler Yapı Malzemeleri; farklı yükseklik ve adım değerlerine sahip trapez sac profillerini çeşitli renk ve kaplama seçenekleriyle sunmaktadır.", "Galvanizli ve poliester kaplamalı trapez sac ürünlerimiz, yağmur, kar, UV ışınları ve rüzgâr baskısı gibi zorlu dış hava koşullarına karşı uzun yıllar boyunca üstün koruma sağlamaktadır. Hafif yapısı montaj süresini ve işçilik maliyetini önemli ölçüde azaltırken çelik iskeletle olan uyumu da statik hesaplamayı kolaylaştırmaktadır.", "Konut çatısından büyük sanayi tesisine, soğuk hava deposundan sera örtüsüne kadar pek çok farklı uygulamada tercih edilen trapez sac ürünlerimizde projeye özel boy kesimi ve renk seçeneği de sunulmaktadır. Uzmanlarımız, doğru profil yüksekliği ve kaplama türünü belirlemenizde size yol gösterebilir."]',
 '["Endüstriyel bina ve fabrika çatıları", "Depo, hangar ve tarımsal yapı örtüsü", "Cephe kaplama ve panel sistemleri", "Soğuk hava deposu ve frigorifik yapılar", "Alışveriş merkezi ve ticari bina çatıları", "Sera çatısı ve yan örtü uygulamaları"]',
 0, '/images/4.jpg', 'Sac Ürünleri', TRUE,
 'Trapez Sac | Galipler Yapı Malzemeleri',
 'Çatı ve cephe kaplaması için galvanizli ve boyalı trapez sac. Uzun ömürlü, dayanıklı trapez sac profilleri Galipler Yapı Malzemeleri''nde.'),

('9', 'Elektrot', 'elektrot', 'Kaynak uygulamaları için çeşitli elektrot çeşitleri.',
 '["Kaynak elektrotu, örtülü ark kaynağı (MMA) yöntemiyle metal birleştirme işlemlerinin temel sarf malzemesidir. Galipler Yapı Malzemeleri, inşaat çeliğinden paslanmaz çeliğe, döküm tamirinden sert dolgu uygulamalarına kadar geniş bir yelpazede elektrot seçeneği sunmaktadır. Her ürün, yüksek ark stabilitesi ve düzgün kaynak dikişi sağlayacak biçimde kalite kontrolünden geçirilmiştir.", "Çelik yapı montajı, sac ve profil kaynağı, boru hattı imalatı ve makine onarımı gibi ağır hizmet uygulamalarında tercih edilen elektrotlarımız; rutin depolar nemi dışında çevresel koşullara karşı dayanıklı kuru paketlerde teslim edilmektedir. Bazik, rutil ve selülozik örtü tiplerine sahip elektrot çeşitlerimiz farklı pozisyon ve enerji kaynaklarıyla uyumlu çalışmaktadır.", "Firmamız, kaynak elektrotu satışında ürün kalitesi garantisinin yanı sıra uygun elektrot seçimi konusunda da teknik rehberlik sunmaktadır. Toplu alım ve sürekli tedarik ihtiyacınız için avantajlı paket seçeneklerimizden yararlanabilirsiniz."]',
 '["Çelik yapı ve konstrüksiyon montajı", "Sac, profil ve boru kaynağı", "Makine ve ekipman onarım kaynağı", "Döküm çelik ve dökme demir tamiri", "Paslanmaz çelik birleştirme uygulamaları", "Sert dolgu ve aşınma direnci kaplaması"]',
 0, '/images/8.jpg', 'Kaynak Malzemeleri', TRUE,
 'Kaynak Elektrotu | Galipler Yapı Malzemeleri',
 'Çelik, paslanmaz ve döküm kaynak uygulamaları için her türde elektrot. Galipler Yapı Malzemeleri''nden kaliteli kaynak elektrotu tedariki.'),

('10', 'OSB Levha', 'osb-levha', 'Yapı ve mobilya uygulamaları için yüksek yoğunluklu OSB levha.',
 '["OSB (Oriented Strand Board – Yönlendirilmiş Yonga Levha), ağaç talaşlarının çapraz yönlü serilmesi ve yüksek basınçlı preslenmesiyle üretilen yapısal bir panel malzemesidir. Masif ağaca kıyasla daha homojen bir yük dağılımı sunan OSB, günümüzde inşaat, ambalaj ve mobilya sektörünün en çok tercih ettiği levha türlerinden biri hâline gelmiştir.", "Galipler Yapı Malzemeleri, OSB/2, OSB/3 ve OSB/4 sınıflarında farklı kalınlık ve ebatlarda levha stoğu bulundurmaktadır. OSB/3 sınıfı ürünlerimiz özellikle çatı altı kaplama, duvar ve zemin döşemesi ile endüstriyel kalıp sistemleri gibi nem oranının değişkenlik gösterebileceği yapısal uygulamalar için tercih edilmektedir. OSB/4 sınıfı ise ağır yük gereksinimlerine cevap vermektedir.", "Hızlı inşaat ve prefabrik yapı sistemlerindeki artan kullanım trendi nedeniyle OSB levhaya olan talep her yıl artmaktadır. Firmamız, yüksek hacimli inşaat projelerinde düzenli ve zamanında teslimat kapasitesiyle güvenilir bir tedarik ortağı olarak öne çıkmaktadır. Projeye özel boyut ve kalınlık gereksinimleri için bizimle iletişime geçin."]',
 '["Çatı altı kaplama ve şaplama altlığı", "Duvar ve bölme döşeme kaplaması", "Yüksek yapı döşeme ve iskelet sistemi", "Ambalaj sandığı ve palet imalatı", "Mobilya, dolap ve iç mekân uygulamaları", "Beton kalıp ve geçici yapı sistemleri"]',
 0, '/images/1.jpg', 'Levha Ürünleri', TRUE,
 'OSB Levha | Galipler Yapı Malzemeleri',
 'Yapı, mobilya ve ambalaj için OSB/2, OSB/3 ve OSB/4 levha çeşitleri. İstanbul Ataşehir''de kaliteli OSB levha tedariki Galipler''de.'),

('11', 'Tekerlek', 'tekerlek', 'Endüstriyel taşıma ve platform sistemleri için çeşitli tekerlek tipleri.',
 '["Endüstriyel tekerlekler, fabrika içi lojistikten depo raf sistemlerine, servis arabalarından vinç ve köprülü nakliye platformlarına kadar her türlü hareket sisteminin temel bileşenidir. Galipler Yapı Malzemeleri; döküm, poliüretan, kauçuk ve çelik bandajlı tekerlek seçeneklerini farklı taşıma kapasiteleri ve aks çaplarıyla sunmaktadır.", "Ağır yük uygulamaları için tercih edilen döküm çelik tekerlekler; keskin darbelere ve sürekli titreşime karşı üstün dayanım sunarken poliüretan ve kauçuk tekerlekler yüzey hasarını önleme ve gürültü azaltma avantajlarıyla öne çıkmaktadır. Frenli ve frensiz model seçenekleri, sabit ve döner tekerlek tasarımları geniş uygulama yelpazesine hitap etmektedir.", "1972''den bu yana sektörün güvenilir tedarikçisi olan firmamız, teknik gereksinimlere uygun doğru tekerlek seçiminde müşterilerimize kapsamlı destek vermektedir. Stok dışı ürünlerde kısa teslim süreleriyle özel tedarik imkânı da sunulmaktadır."]',
 '["El arabaları ve platform taşıtları", "Endüstriyel raf ve depo sistemleri", "Servis arabaları ve seyyar tezgahlar", "Makine ve ekipman hareket sistemleri", "Vinç, köprülü taşıyıcı ve palet makineleri", "Lojistik ve yük taşıma araçları"]',
 0, '/images/15.jpeg', 'Endüstriyel Ürünler', TRUE,
 'Endüstriyel Tekerlek | Galipler Yapı Malzemeleri',
 'Platform, el arabası ve depo sistemleri için döküm, poliüretan ve çelik bandajlı endüstriyel tekerlek çeşitleri. Galipler Yapı Malzemeleri.'),

('12', 'Makara', 'makara', 'Çelik halat ve kablo sistemleri için endüstriyel makara çeşitleri.',
 '["Endüstriyel makara, halat, kablo ve zincir gibi esnek taşıma elemanlarının yön değiştirmesini veya mekanik avantaj sağlanmasını mümkün kılan kritik bir aktarma organıdır. Vinç, asansör, liman ekipmanları ve inşaat şantiyesi kaldırma sistemlerinde yaygın biçimde kullanılan makaralar; yük kapasitesi, malzeme seçimi ve bilya tipi açısından doğru belirlenmesi gereken hassas bileşenlerdir.", "Galipler Yapı Malzemeleri stoğunda; tek ve çok kanallı makara, sabit ve hareketli kasa makaraları, galvanizli ve paslanmaz gövde seçenekleri yer almaktadır. Bilyalı ve burçlu yatak tasarımlarına sahip ürünlerimiz; ağır yük koşullarında düşük sürtünme kaybı ve uzun servis ömrü sunacak biçimde üretilmiştir.", "Doğru makara seçimi, kaldırma sisteminin verimliliğini ve güvenliğini doğrudan etkilemektedir. Firmamız, 50 yılı aşkın sektör deneyimiyle uygulama koşullarınızı değerlendirip en uygun makara konfigürasyonunu belirlemenize yardımcı olmaktadır. Toplu tedarik ve proje bazlı teklifler için WhatsApp hattımızdan ulaşabilirsiniz."]',
 '["Vinç ve kaldırma makinesi sistemleri", "Halat ve kablo yönlendirme düzenekleri", "Asansör ve platform taşıma sistemleri", "Maden ve inşaat şantiyesi vincler", "Endüstriyel taşıma ve konveyör hatları", "Denizcilik, yük kaldırma ve liman ekipmanları"]',
 0, '/images/6.jpg', 'Endüstriyel Ürünler', TRUE,
 'Endüstriyel Makara | Galipler Yapı Malzemeleri',
 'Vinç, asansör ve kaldırma sistemleri için tek ve çok kanallı endüstriyel makara çeşitleri. Galipler Yapı Malzemeleri İstanbul Ataşehir.')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED: Blog yazıları
-- ============================================================

INSERT INTO blog_posts (id, date, title, slug, excerpt, content, author, tags, og_image, meta_title, meta_description) VALUES
('1778748044377', '2026-05-14T08:40:44.377Z',
 'Doğru Yapı Malzemesi Nasıl Seçilir? Uzman Rehberi',
 'dogru-yapi-malzemesi-nasil-secilir-uzman-rehberi',
 'İnşaat veya tadilat projeniz için doğru yapı malzemesini seçmek, hem maliyet hem de uzun ömürlülük açısından kritik öneme sahiptir. 1972''den beri sektörde olan Galipler olarak en önemli ipuçlarını sizin için derledik.',
 '<p>İnşaat ve tadilat projelerinde başarının en temel koşullarından biri, doğru yapı malzemesini doğru yerde kullanmaktır. Yanlış malzeme seçimi hem bütçenizi hem de projenizin ömrünü olumsuz etkiler. 1972''den bu yana İstanbul Ataşehir''de hizmet veren Galipler Yapı Malzemeleri olarak, yılların deneyimiyle hazırladığımız bu rehberde en sık sorulan soruları yanıtlıyoruz.</p>

<h2>1. Kullanım Amacını Belirleyin</h2>
<p>Malzeme seçiminin ilk adımı, kullanım amacını net olarak belirlemektir. Taşıyıcı bir yapı elemanı mı inşa ediyorsunuz, yoksa dekoratif bir uygulama mı yapıyorsunuz? Örneğin ferforje, hem estetik hem de dayanıklılık gerektiren korkuluk, kapı ve balkon uygulamalarında ideal bir seçimdir. Boru ve profiller ise taşıyıcı strüktür uygulamalarında tercih edilir.</p>

<h2>2. Dış Mekân mı, İç Mekân mı?</h2>
<p>Malzemenin kullanılacağı ortam, seçim sürecinde belirleyici bir etkendir. Dış mekânda kullanılacak malzemelerin yağmur, nem ve UV ışınlarına karşı dayanıklı olması gerekir. Galvaniz kaplı borular ve özel boya işlemi görmüş profiller, dış mekân koşullarına karşı uzun yıllar sorunsuz hizmet verir. İç mekânda ise standart çelik ve sac ürünler yeterlidir.</p>

<h2>3. Yük Taşıma Kapasitesini Hesaplayın</h2>
<p>Yapı malzemelerinde en kritik parametrelerden biri yük taşıma kapasitesidir. Kullanacağınız malzemenin ne kadar ağırlık taşıyacağını önceden hesaplamanız gerekir. I demirleri ve HEA/HEB profiller yüksek yük kapasitesi gerektiren uygulamalar için üretilmiştir. Köşebentler ise bağlantı noktalarını güçlendirmek için yaygın olarak kullanılır.</p>

<h2>4. Bütçenizi Akıllıca Planlayın</h2>
<p>Kaliteli malzeme, uzun vadede her zaman daha ekonomiktir. Düşük kaliteli bir ürün kısa sürede değiştirilmek zorunda kalınabilir ve bu durum hem maliyet hem de zaman kaybına yol açar. Öte yandan her uygulama için en pahalı malzemeyi seçmek de gerekmez. İhtiyacınıza tam olarak uyan ürünü seçmek, bütçenizi en verimli şekilde kullanmanızı sağlar.</p>

<h2>5. Tedarikçinizin Deneyimine Güvenin</h2>
<p>50 yılı aşkın sektör deneyimimizle, müşterilerimize yalnızca ürün satmıyor; proje bazlı danışmanlık da sunuyoruz. Hangi malzemenin nerede kullanılacağı, hangi kalınlık veya profilin seçilmesi gerektiği gibi konularda uzman ekibimiz size rehberlik eder.</p>

<p>Projeniz için en uygun yapı malzemesini bulmak istiyorsanız, <strong>WhatsApp hattımız üzerinden</strong> bizimle iletişime geçebilirsiniz. Ataşehir mağazamızda sizi bekliyoruz.</p>',
 'Galipler Yapı Malzemeleri',
 '["yapı malzemeleri", "inşaat", "ferforje", "sac", "boru", "profil"]',
 '/images/1778748041328.jpg',
 'Doğru Yapı Malzemesi Nasıl Seçilir? | Galipler Yapı Malzemeleri',
 'Ferforje, boru, profil, sac seçiminde dikkat edilmesi gerekenler. Galipler Yapı Malzemeleri''nin 50 yıllık deneyimiyle hazırlanmış uzman rehberi.')
ON CONFLICT (id) DO NOTHING;
