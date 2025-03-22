import { useState } from "react";

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
   * Fungsi ini bertujuan untuk menambahkan tugas baru ke dalam daftar todos
   * Fungsi ini akan dijalankan ketika tombol "Tambahkan" diklik
   */
  function addNewTodos() {
    /**
     * Langkah 1: Membuat objek todoItem yang akan menyimpan informasi tugas baru
     * - Properti title akan diisi dengan nilai dari state textInput (input pengguna)
     * - Properti isCompleted diset false karena tugas baru belum selesai
     *
     * Mengapa menggunakan state?
     * - State textInput menyimpan input pengguna yang bisa berubah-ubah
     * - Setiap perubahan input akan otomatis tersimpan di state textInput
     * - Saat tombol "Tambah" diklik, nilai terakhir dari textInput digunakan
     */
    const todoItem = {
      title: textInput,
      isCompleted: false,
    };

    /**
     * Langkah 2: Menambahkan tugas baru ke dalam state todos
     *
     * Mengapa menggunakan setTodos dengan callback?
     * - setTodos adalah fungsi khusus dari useState untuk mengubah state todos
     * - Callback (previousTodos) => [...] memastikan kita menggunakan data terbaru
     * - [...previousTodos, todoItem] artinya:
     *   1. Salin semua tugas yang sudah ada (...previousTodos)
     *   2. Tambahkan todoItem baru di akhir array
     * - Setelah setTodos dijalankan, React akan otomatis memperbarui tampilan
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
    // Mencari index tugas yang akan diubah statusnya
    const selectedIndex = todos.findIndex(
      (item) => item.title === todoItem.title
    );

    // Jika tugas ditemukan (index tidak -1)
    if (selectedIndex !== -1) {
      // Menggunakan setTodos untuk mengubah status isCompleted
      // Menggunakan setTodos untuk mengubah state todos
      // Kenapa kita menggunakan setTodos dengan callback?
      // 1. setTodos adalah fungsi dari useState untuk mengubah data todos
      // 2. Callback (previousTodos) memastikan kita mendapat data todos yang terbaru
      // 3. Ini penting agar tidak ada data yang hilang atau tertimpa

      // Bagaimana cara kerjanya?
      // 1. [...previousTodos] - membuat salinan array todos yang ada
      // 2. updatedTodos[selectedIndex] - mengakses tugas yang ingin diubah
      // 3. isCompleted = isChecked - mengubah status selesai sesuai checkbox
      // 4. return updatedTodos - menyimpan perubahan ke dalam state

      // Mengapa harus membuat salinan array?
      // - React membutuhkan object/array baru untuk mendeteksi perubahan
      // - Mengubah array langsung tidak akan memicu pembaruan tampilan
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
      {/* Menampilkan daftar tugas yang sudah dimasukkan oleh pengguna dalam bentuk list */}
      <ol>
        {/* 
          Melakukan perulangan pada array todos menggunakan method map()
          untuk menampilkan setiap tugas yang sudah dimasukkan
        */}
        {todos.map((item) => (
          /**
           * Menampilkan setiap tugas dalam bentuk list item (<li>)
           * Data tugas memiliki 2 properti:
           * - title: teks tugas yang dimasukkan (string)
           * - isCompleted: status penyelesaian tugas (boolean)
           *
           * key={item.title} digunakan sebagai identifier unik yang diperlukan React
           * untuk melakukan render list dengan efisien
           */
          /* 
            Menampilkan setiap tugas dalam bentuk list item (<li>)
            - key={item.title} adalah identifier unik yang diperlukan React untuk melakukan render list dengan efisien
            - input type="checkbox" digunakan untuk menandai status tugas (selesai/belum)
            - value={item.isCompleted} menggunakan state untuk menyimpan status checkbox
              Mengapa menggunakan state?
              1. State memungkinkan React melacak perubahan data
              2. Ketika checkbox dicentang, state akan berubah
              3. React akan otomatis memperbarui tampilan sesuai perubahan state
            - {item.title} menampilkan teks tugas yang diinput pengguna
          */
          <li key={item.title}>
            {/* 
              Menggunakan useState untuk mengelola status checkbox:
              1. useState memungkinkan kita menyimpan dan mengubah data yang bisa berubah
              2. Ketika checkbox dicentang, nilai akan berubah dari false ke true atau sebaliknya
              3. Perubahan status ini akan disimpan dalam state menggunakan useState
              4. React akan otomatis memperbarui tampilan ketika state berubah
              5. Fungsi onCompletedTask akan dipanggil setiap kali checkbox berubah
              6. event.target.checked mengambil nilai true/false dari checkbox
            */}
            {/* 
              Kode di bawah menggunakan operator ternary (?) untuk menampilkan:
              - Emoji centang (✅) jika tugas sudah selesai (item.isCompleted = true)
              - Checkbox jika tugas belum selesai (item.isCompleted = false)
            */}
            {
              item.isCompleted ? (
                <>✅&nbsp;</> // Menampilkan emoji centang dan spasi jika tugas selesai
              ) : (
                <input
                  type="checkbox"
                  value={item.isCompleted}
                  onChange={(event) => {
                    /* 
                      Fungsi ini akan dijalankan ketika checkbox diklik:
                      1. event.target.checked berisi status checkbox (dicentang/tidak)
                      2. Nilai checked akan dikirim ke fungsi onCompletedTask
                      3. onCompletedTask akan mengubah status tugas (selesai/belum)
                      4. React akan otomatis memperbarui tampilan sesuai status baru
                      5. Jika dicentang, checkbox akan berubah menjadi emoji centang
                    */
                    onCompletedTask(event.target.checked, item);
                  }}
                />
              )
            }
            

            {/* 
              Menampilkan judul tugas:
              1. {item.title} akan menampilkan teks tugas yang diinput pengguna
              2. Tanda kurung kurawal {} digunakan untuk menampilkan nilai dari variabel/properti dalam JSX
            */}
            {item.title}

            {/* 
              Menampilkan status tugas selesai:
              1. Menggunakan operator && (AND) untuk conditional rendering
              2. Jika item.isCompleted bernilai true, maka teks "(Tugas Sudah Selesai)" akan ditampilkan
              3. Jika false, tidak akan menampilkan apapun
              4. Tag <strong> membuat teks menjadi tebal
              5. &nbsp; digunakan untuk menambah spasi sebelum teks
            */}
            {item.isCompleted && <strong>&nbsp;(Tugas Sudah Selesai)</strong>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
