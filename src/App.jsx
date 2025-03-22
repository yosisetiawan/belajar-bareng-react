import { useState } from "react";
import TaskList from "./components/TaskList";


/**
 * App Component
 * 
 * Komponen utama yang mengelola aplikasi todo list
 * 
 * State:
 * - todos: Array yang menyimpan daftar tugas
 *   Setiap tugas memiliki properti:
 *   - title: String (judul/nama tugas)
 *   - isCompleted: Boolean (status penyelesaian)
 * 
 * - textInput: String yang menyimpan input teks dari user
 * 
 * Fungsi:
 * - addNewTodos(): Menambahkan tugas baru ke daftar todos
 *   Membuat objek tugas baru dan menambahkannya ke state todos
 * 
 * - onCompletedTask(): Mengubah status penyelesaian tugas
 *   Dipanggil saat checkbox di-klik untuk menandai tugas selesai
 * 
 * Fitur:
 * - Input teks untuk menambah tugas baru
 * - Tombol untuk menambahkan tugas
 * - Daftar tugas dalam bentuk list
 * - Checkbox untuk menandai tugas selesai
 * - Indikator visual untuk tugas yang sudah selesai
 * 
 * @component
 * @returns {JSX.Element} Komponen App yang merender seluruh aplikasi todo list
 */

function App() {
  /**
   * Menggunakan useState untuk menyimpan daftar tugas (todos)
   * - todos: array yang berisi daftar tugas
   * - setTodos: fungsi untuk mengubah nilai todos
   * - useState([]): membuat state dengan nilai awal array kosong
   */
  const [todos, setTodos] = useState([]);

  /**
   * Menggunakan useState untuk menyimpan teks input dari pengguna
   * - textInput: string yang berisi teks dari input pengguna
   * - setTextInput: fungsi untuk mengubah nilai textInput
   * - useState(""): membuat state dengan nilai awal string kosong
   */
  const [textInput, setTextInput] = useState("");

  /**
   * Fungsi untuk menambah tugas baru ke daftar todos
   * Fungsi ini akan berjalan saat tombol "Tambahkan" diklik
   * 
   * Cara kerjanya:
   * 1. Membuat objek tugas baru dengan judul dari input user
   * 2. Menambahkan objek tugas tersebut ke daftar todos yang sudah ada
   */
  function addNewTodos() {
    /**
     * Langkah 1: Membuat objek untuk menyimpan tugas baru
     * 
     * Penjelasan:
     * - Kita buat objek bernama todoItem
     * - title: Mengambil teks yang diketik user dari state textInput 
     * - isCompleted: Diberi nilai false karena tugas baru belum selesai
     * 
     * Catatan:
     * - textInput adalah state yang menyimpan teks dari kotak input
     * - State adalah tempat menyimpan data yang bisa berubah di React
     * - Setiap user mengetik, nilai textInput akan berubah otomatis
     */
    const todoItem = {
      title: textInput,
      isCompleted: false,
    };

    /**
     * Langkah 2: Memasukkan tugas baru ke daftar todos
     * 
     * Penjelasan:
     * - setTodos adalah fungsi untuk mengubah isi state todos
     * - previousTodos berisi daftar tugas yang sudah ada sebelumnya
     * - [...previousTodos, todoItem] artinya:
     *   > Salin semua tugas lama (...previousTodos)
     *   > Tambahkan tugas baru (todoItem) di akhir
     * 
     * Catatan:
     * - Kita pakai setTodos agar React tahu kalau data berubah
     * - Setelah data berubah, tampilan akan diperbarui otomatis
     * - Tanda ... (spread operator) digunakan untuk menyalin array
     */
    setTodos((previousTodos) => [...previousTodos, todoItem]);
  }

  /**
   * Fungsi ini bertujuan untuk menandai tugas yang sudah selesai
   * @param {boolean} isChecked - Status checkbox (dicentang/tidak)
   * @param {object} todoItem - Objek tugas yang akan diubah statusnya
   *
   * Mengapa menggunakan useState untuk menyimpan status tugas?
   * 1. useState memungkinkan kita menyimpan data yang bisa berubah
   * 2. Ketika checkbox dicentang, kita perlu mengubah status isCompleted
   * 3. Perubahan status ini perlu disimpan agar tidak hilang saat halaman di-refresh
   * 4. useState akan memicu React untuk memperbarui tampilan secara otomatis
   */
  function onCompletedTask(isChecked, todoItem) {
    // Langkah 1: Mencari posisi tugas yang akan diubah dalam array todos
    // - Menggunakan method findIndex untuk mencari index/posisi tugas
    // - Mencari berdasarkan title yang sama dengan tugas yang diklik
    // - Hasilnya disimpan dalam variabel selectedIndex
    const selectedIndex = todos.findIndex(
      (item) => item.title === todoItem.title
    );

    // Langkah 2: Memeriksa apakah tugas ditemukan
    // - Jika selectedIndex = -1, artinya tugas tidak ditemukan
    // - Kode dalam if hanya dijalankan jika tugas ditemukan
    if (selectedIndex !== -1) {
      // Langkah 3: Mengubah status tugas menggunakan setTodos
      // 
      // Penjelasan penggunaan setTodos dengan callback:
      // - setTodos adalah fungsi untuk mengubah state todos
      // - Callback (previousTodos) => {...} digunakan agar kita mendapat data todos terbaru
      // - Ini mencegah data todos yang lama tertimpa
      //
      // Cara kerja kode di bawah:
      // 1. [...previousTodos] = membuat salinan dari array todos
      //    - Kita tidak boleh mengubah array todos secara langsung
      //    - React perlu array baru untuk mendeteksi perubahan
      //
      // 2. updatedTodos[selectedIndex] = mengakses tugas yang akan diubah
      //    - selectedIndex adalah posisi tugas dalam array
      //
      // 3. isCompleted = isChecked = mengubah status selesai/belum
      //    - isChecked adalah status checkbox (true/false)
      //    - Jika checkbox dicentang, status berubah jadi selesai
      //
      // 4. return updatedTodos = menyimpan perubahan ke state
      //    - React akan memperbarui tampilan secara otomatis
      setTodos((previousTodos) => {
        const updatedTodos = [...previousTodos];
        updatedTodos[selectedIndex].isCompleted = isChecked;
        return updatedTodos;
      });
    }
  }

  return (
    <div>
      {/* 
        Input untuk memasukkan tugas baru
        - Menggunakan state 'textInput' untuk menyimpan nilai input
        - Ketika pengguna mengetik (onChange), nilai input akan disimpan ke state menggunakan setTextInput
        - value={textInput} membuat input "terkontrol" - nilainya selalu sesuai dengan state
        - Tombol "Tambahkan" akan menjalankan fungsi addNewTodos untuk menyimpan tugas baru
      */}
      <div>
        <input
          type="text"
          value={textInput}
          onChange={(event) => {
            setTextInput(event.target.value);
          }}
        />
        <button onClick={addNewTodos}>Tambahkan</button>
      </div>
      {/* 
        Menampilkan daftar tugas menggunakan komponen TaskList:
        
        - todos={todos}
          Mengirim data tugas dari state todos ke komponen TaskList
          Data ini berisi array/kumpulan tugas yang akan ditampilkan
        
        - onCompletedTask={onCompletedTask} 
          Mengirim fungsi untuk menandai tugas selesai/belum
          Fungsi ini akan dipanggil saat checkbox di TaskList diklik
          
        Catatan:
        - Komponen TaskList akan menerima props todos dan onCompletedTask
        - Props adalah cara React mengirim data dari komponen induk ke anak
        - Data yang dikirim bisa diakses di komponen TaskList
      */}
      <TaskList
        todos={todos}
        onCompletedTask={onCompletedTask}
      />
    </div>
  );
}

export default App;
