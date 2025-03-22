/* eslint-disable react/prop-types */
/**
 * Komponen TaskList untuk menampilkan daftar tugas
 * 
 * Props yang diterima:
 * - todos: Array berisi daftar tugas yang akan ditampilkan
 *   Setiap tugas memiliki properti:
 *   - title: String (judul tugas)
 *   - isCompleted: Boolean (status selesai/belum)
 * 
 * - onCompletedTask: Fungsi yang dipanggil saat checkbox diklik
 *   Fungsi ini menerima 2 parameter:
 *   - isChecked: Boolean (status checkbox)
 *   - item: Object (data tugas yang diklik)
 * 
 * Catatan:
 * - Props adalah cara React mengirim data dari komponen induk ke anak
 * - Kita menggunakan destructuring {todos, onCompletedTask} untuk mengambil props
 * - Tanda => menunjukkan ini adalah arrow function component
 */
const TaskList = ({ todos, onCompletedTask }) => {
    return (
        <ol>
        {/* 
          Menggunakan method map() untuk menampilkan setiap tugas dari array todos
          - map() akan mengulang setiap item dalam array todos
          - Setiap item akan ditampilkan sebagai list item (<li>)
        */}
        {todos.map((item) => (
          /**
           * Setiap tugas memiliki 2 data penting:
           * - title: Nama/judul tugas (berupa teks)
           * - isCompleted: Status tugas selesai/belum (true/false)
           * 
           * Kita perlu menambahkan key={item.title} pada <li>
           * - key digunakan React untuk mengidentifikasi setiap item
           * - Tanpa key, React akan menampilkan warning/peringatan
           */
          <li key={item.title}>
            {/* 
              Menggunakan operator ternary (?) untuk menampilkan:
              - Jika tugas selesai (isCompleted = true): tampilkan emoji centang (✅)
              - Jika tugas belum selesai (isCompleted = false): tampilkan checkbox
              
              Cara membaca kode:
              item.isCompleted ? (tampilkan jika true) : (tampilkan jika false)
            */}
            {
              item.isCompleted ? (
                <>✅&nbsp;</> // Emoji centang + spasi untuk tugas selesai
              ) : (
                <input
                  type="checkbox"
                  value={item.isCompleted}
                  onChange={(event) => {
                    /* 
                      Ketika checkbox diklik:
                      1. event.target.checked berisi status checkbox baru
                         - true jika dicentang
                         - false jika tidak dicentang
                      2. Kita kirim status baru dan data tugas ke fungsi onCompletedTask
                      3. Fungsi ini akan mengubah status tugas di komponen induk (App)
                    */
                    onCompletedTask(event.target.checked, item);
                  }}
                />
              )
            }
            
            {/* 
              Menampilkan judul tugas:
              - Menggunakan {item.title} untuk menampilkan teks dari data
              - Tanda {} digunakan untuk menulis kode JavaScript di dalam JSX
            */}
            {item.title}

            {/* 
              Menampilkan status "(Tugas Sudah Selesai)":
              - Menggunakan operator && (AND)
              - Jika item.isCompleted = true: teks akan ditampilkan
              - Jika item.isCompleted = false: tidak ada yang ditampilkan
              
              Cara membaca:
              {kondisi && (tampilkan jika kondisi true)}
            */}
            {item.isCompleted && <strong>&nbsp;(Tugas Sudah Selesai)</strong>}
          </li>
        ))}
      </ol>
    )
}

export default TaskList