export interface UserRole {
  id: number;
  username: string;
  role: string;
  name: string;
}

export interface Persediaan {
  id: number;
  jumlah: string;
  satuan: string;
  product_id: string;
  nama_barang: string;
  harga_satuan: string;
  vendor: string;
  no_telp: string;
}

export interface Pemesanan extends Persediaan {
  harga_total: string;
}

export interface Transaksi {
  id: number;
  nama_vendor: string;
  tanggal: string;
  invoice_path: string;
  status: string;
}

export interface Pencatatan {
  id: number;
  tanggal: string;
  uraian: string;
  nama_barang: string;
  masuk: string;
  keluar: string;
}
