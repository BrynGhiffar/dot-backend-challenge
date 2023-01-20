# Challenge
1. Buatlah simple rest api app dengan Node.js dengan kriteria sebagai berikut:
    a. Terdiri dari minimal 2 operasi crud yang saling berkaitan.
    b. Menyimpan data menggunakan database Sql atau NoSql. (pilih salah satu)
    c. Authentication api menggunakan JWT token.
    d. Buatkan fitur e2e testing untuk test token apinya. 
    e. Pilih pattern project yang sering anda gunakan. 
    f. Jelaskan mengapa menggunakan pattern tersebut di readme github.

2. Buat video demo aplikasi dengan spesifikasi:
    a. Demokan aplikasi di seluruh halaman
    b. Penjelasan hasil pengerjaan dari setiap poin pada soal nomor 1
    c. Presentasi dengan open camera
    d. Gunakan aplikasi www.loom.com sebagai alat perekam (recording)
    e. Share LINK hasil recording pada isian yang sudah disediakan (pastikan link bisa diakses)

Note: Untuk framework/teknologi Node.js yang digunakan BEBAS. Bisa menggunakan nestjs, express, meteor, dan lain-lain.

# Explanation
Mengapa menggunakan pattern project seperti ini?

Saya menggunakan pattern project seperti ini karena strukturnya lumayan sederhana.
Tidak banyak object2 atau data struktur yang diperlukan dalam project ini sehingga struktur yang sederhana
ini cukup. Flow aplikasi jelas, karena kita dapat melihat bahwa proses eksekusi dimulai dari routes terus ke service kemudian ke
ke repository, satu flow yang jelas. Bila ada flow yang lebih banyak mungkin tidak hanya update ke database, namun juga update
ke suatu API lain. Atau sistem dapat mendapatkan notifikasi lewat Google Pub/Sub misal, maka arsitektur seperti hexagonal mungkin lebih pantas.