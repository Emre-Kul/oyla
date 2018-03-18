# Oyla
Oyla, Yıldız Teknik Üniversitesi Bilgisayar Mühendisliği Sistem Programlama dersi için oluşturulmuş web tabanlı bir anket sistemi projesidir.
## Kurulum
---
```sh
$ npm install
$ bower install
$ npm start
```
## Sistem Analizi
---
Proje için daha önceden yapılmış SurveyMonkey, Doodle gibi web tabanlı anket sistemleri incelendi. Yapılan incelemeler sonunda takım üyeleri ile birlikte projede kullanılacak teknolojilere, kullanıcı rollerine, rollerin fonksiyonlarına ve model özelliklerine karar verildi.

### Kullanılacak Teknolojiler
* NodeJS
* MySQL

### Kullanıcı Rolleri ve Fonksiyonları
* Genel Kullanıcı
    * Herkese Açık Anketleri Görüntüleme
    * Anahtar Kelimeler ile Anket Arama
    * Mevcut Anket Görüntüleme
    * Mevcut Anket Doldurma

* Anket Oluşturan Kullanıcı
    * Yeni Anket Oluşturma
    * Oluşturduğu Anketlere Anahtar Kelimeler Ekleme
    * Mevcut Anketleri Görüntüleme
    * Mevcut Anket Raporu Görüntüleme
    * Mevcut Anket Raporunu Dışarı Aktarma

### Model Özellikleri
* Anket
    * Anket Metni
    * Anket Görünürlüğü (Genel / Gizli)
    * Anket Sonuçlarının Görünürlüğü
    * Anket Geçerliliği (Sürekli açık / Belirli süreye kadar açık)
    * Anket Veri Doğrulama
    * Anket Güvenliği
* Soru
    * Yazı Kutusu
    * Çoktan Seçmeli
    * 5 Puan Üzerinden Değerlendirme
    * Onay Kutusu
    * Açılır Liste
    * Sıralama
* Rapor
    * Günlük / Aylık Anket Raporu
    * Görsel Grafikler

## Veritabanı
---
![Veritabanı](https://github.com/Emre-Kul/oyla/blob/master/database_schema.png?raw=true)

## Takım Üyeleri
---
* Emre Kul
* Kaan Sönmezöz
* Ramazan Vapurcu
