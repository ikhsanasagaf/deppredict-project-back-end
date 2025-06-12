# DepPredict - API Back-end

![Hapi.js + MongoDB](https://i.imgur.com/8Q8hYxj.png)

Ini adalah repositori untuk layanan **Back-end** dari proyek DepPredict. API ini dibangun menggunakan framework **Hapi.js** dan bertanggung jawab untuk menangani otentikasi pengguna, termasuk registrasi dan login.

Data pengguna disimpan dengan aman di database **MongoDB Atlas**, dan proses otentikasi menggunakan **JSON Web Tokens (JWT)** untuk menjaga keamanan sesi pengguna.

**Live API Endpoint:** [`https://deppredict-api.netlify.app/`](https://deppredict-api.netlify.app/)

---

## Fitur Utama

-   **Registrasi Pengguna**: Endpoint untuk membuat akun pengguna baru dengan nama, email, dan password yang di-hash.
-   **Login Pengguna**: Endpoint untuk memverifikasi kredensial pengguna dan mengeluarkan `accessToken` (JWT) jika berhasil.
-   **Validasi Data**: Menggunakan `@hapi/joi` untuk memastikan semua data yang masuk ke API memiliki format yang benar.
-   **Struktur Modular**: Kode disusun berdasarkan fitur (API, Services, Validator) untuk kemudahan perawatan dan pengembangan.
-   **Deployment Serverless**: Dikonfigurasi untuk di-deploy sebagai *serverless function* di Netlify, memastikan skalabilitas dan efisiensi biaya.

---

## Teknologi yang Digunakan

-   **Framework**: Hapi.js
-   **Database**: MongoDB (dengan driver `mongodb`)
-   **Otentikasi**: JSON Web Tokens (@hapi/jwt)
-   **Validasi**: Joi (@hapi/joi)
-   **Hashing Password**: Bcrypt
-   **Environment Variables**: Dotenv
-   **Deployment**: Netlify Functions

---

## Dokumentasi API

### 1. Registrasi Pengguna

-   **Endpoint**: `POST /users`
-   **Deskripsi**: Mendaftarkan seorang pengguna baru.
-   **Request Body**:
    ```json
    {
        "name": "Nama Lengkap Anda",
        "email": "email@contoh.com",
        "password": "passwordrahasia"
    }
    ```
-   **Respons Sukses (201 Created)**:
    ```json
    {
        "status": "success",
        "message": "User berhasil ditambahkan",
        "data": {
            "userId": "user-xxxxxxxxxxxxxxxx"
        }
    }
    ```
-   **Respons Gagal (Contoh)**:
    ```json
    {
        "status": "fail",
        "message": "Gagal menambahkan user. Email sudah digunakan."
    }
    ```

### 2. Login Pengguna

-   **Endpoint**: `POST /login`
-   **Deskripsi**: Mengotentikasi pengguna dan memberikan `accessToken`.
-   **Request Body**:
    ```json
    {
        "email": "email@contoh.com",
        "password": "passwordrahasia"
    }
    ```
-   **Respons Sukses (200 OK)**:
    ```json
    {
        "status": "success",
        "message": "Login berhasil",
        "data": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
    }
    ```
-   **Respons Gagal (Contoh)**:
    ```json
    {
        "status": "fail",
        "message": "Kredensial yang Anda berikan salah"
    }
    ```

---

## Instalasi dan Setup Lokal

Untuk menjalankan API ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Prasyarat**
    -   Node.js (v18 atau lebih baru)
    -   NPM
    -   MongoDB yang sedang berjalan (bisa lokal atau menggunakan URI dari MongoDB Atlas).

2.  **Clone Repositori**
    ```bash
    git clone [https://github.com/ikhsanasagaf/deppredict-project-back-end.git](https://github.com/ikhsanasagaf/deppredict-project-back-end.git)
    ```

3.  **Masuk ke Direktori Proyek**
    ```bash
    cd deppredict-project-back-end
    ```

4.  **Install Semua Dependency**
    ```bash
    npm install
    ```

5.  **Konfigurasi Environment Variables**
    Buat sebuah file bernama `.env` di direktori root proyek. Salin isi dari `.env.example` (jika ada) atau isi dengan variabel berikut:
    ```env
    # Konfigurasi Server Hapi
    HOST=localhost
    PORT=9001

    # Konfigurasi MongoDB (Wajib diisi)
    MONGO_URI=mongodb+srv://<user>:<password>@cluster...

    # Konfigurasi JWT (Wajib diisi)
    ACCESS_TOKEN_KEY=kunciRahasiaJwtYangSangatPanjangDanAman
    ```

6.  **Menjalankan Server Development**
    Perintah ini akan menjalankan API pada `http://localhost:9001` dengan *hot-reloading* menggunakan `nodemon`.
    ```bash
    npm run start:dev
    ```

---

## Repositori Terkait

Proyek DepPredict terdiri dari tiga bagian utama:

1.  **Front-end**: Antarmuka pengguna yang dilihat oleh pengguna.
    -   [github.com/ikhsanasagaf/deppredict-project-front-end](https://github.com/ikhsanasagaf/deppredict-project-front-end)
2.  **Back-end (Repositori Ini)**: API yang menangani otentikasi.
3.  **Machine Learning**: Notebook dan model untuk melatih dan mengekspor model prediksi.
    -   [github.com/ikhsanasagaf/deppredict-machine-learning](https://github.com/ikhsanasagaf/deppredict-machine-learning)
