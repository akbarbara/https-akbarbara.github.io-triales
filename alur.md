flowchart TD
    %% ==========================================
    %% STYLE DEFINITIONS (Biar Cantik)
    %% ==========================================
    classDef startend fill:#4A90E2,stroke:#1C3D5A,stroke-width:2px,color:#fff,font-weight:bold;
    classDef action fill:#F5A623,stroke:#B06D0A,stroke-width:2px,color:#fff;
    classDef decision fill:#D0021B,stroke:#8B0000,stroke-width:2px,color:#fff;
    classDef doc fill:#50E3C2,stroke:#2A8C7B,stroke-width:2px,color:#1C3D5A;
    classDef followup fill:#F8E71C,stroke:#B89C00,stroke-width:2px,color:#1C3D5A;
    classDef deal fill:#7ED321,stroke:#4A8C0A,stroke-width:2px,color:#1C3D5A,font-weight:bold;

    %% ==========================================
    %% FASE 0: PERSIAPAN
    %% ==========================================
    Start((MULAI)):::startend --> Persiapan[FASE 0: PERSIAPAN PERANG]:::action
    Persiapan --> PilihTarget[1. Buka PDF WAJIB BACA<br>Pilih 10 Target Prioritas]:::action
    PilihTarget --> SiapAmunisi[2. Siapkan Proposal PDF<br>& Surat Tugas di HP]:::doc
    SiapAmunisi --> FASE1

    %% ==========================================
    %% FASE 1: KONTAK PERTAMA
    %% ==========================================
    FASE1[FASE 1: KONTAK PERTAMA]:::action --> KirimWA[3. Kirim WA Pembuka<br>'Salam, Referensi Mas Akbar,<br>Tawarkan 300 Mahasiswa']:::action
    KirimWA --> TanyaRespon{4. Dibalas &<br>Minta Proposal?}:::decision

    TanyaRespon -->|Tidak| FU_TdkBalas[Follow Up H+2:<br>'Memastikan Proposal Diterima']:::followup
    FU_TdkBalas --> TanyaRespon

    TanyaRespon -->|Ya| KirimProposal[5. Kirim Proposal SAAT ITU JUGA]:::doc
    KirimProposal --> UpdateSheet1[UPDATE SPREADSHEET:<br>'FU1: Dikirim, Menunggu Review']:::doc

    %% ==========================================
    %% FASE 2: FOLLOW UP INTENSIF
    %% ==========================================
    UpdateSheet1 --> FASE2[FASE 2: SIKLUS FOLLOW UP]:::action
    FASE2 --> FU2[6. H+4: Kirim WA<br>'Ada yg perlu disesuaikan?']:::followup
    FU2 --> Nego[7. NEGO: Sponsor Nawarin Barang/FnB]:::decision
    
    Nego -->|Terima Barang + Minta FM| TawarFM[Balas: 'Terima kasih Barangnya.<br>Untuk Biaya Operasional,<br>Apakah ada support Fresh Money?']:::action
    TawarFM --> FU3
    
    Nego -->|Deal FM| FU3
    
    FU3[8. H+7: WA Deadline Palsu<br>'Mau Naik Cetak Backdrop,<br>Logo Jadi Dicantumkan?']:::followup --> Keputusan{9. Ada Keputusan?}:::decision

    %% ==========================================
    %% FASE 3: DEAL ATAU TIDAK
    %% ==========================================
    Keputusan -->|Tidak / Ditolak| TolakHalus[Balas Elegan:<br>'Terima kasih waktunya.<br>Semoga di event berikutnya.']:::action
    TolakHalus --> Selesai((SELESAI - GAGAL)):::startend

    Keputusan -->|YA / DEAL| ProsesDeal[FASE 3: PROSES DEAL]:::deal
    ProsesDeal --> MintaData[10. Minta Logo HD & Data MOU]:::doc
    MintaData --> KirimMOU[11. Kirim MOU & Invoice]:::doc
    KirimMOU --> Transfer{Masuk Rekening?}:::decision
    
    Transfer -->|Belum| CekRek[Pantau Setiap Pagi]:::action
    CekRek --> Transfer
    
    Transfer -->|Sudah Masuk| Konfirmasi[12. WA Konfirmasi:<br>'Dana sudah masuk, terima kasih.']:::deal
    Konfirmasi --> Acara((13. ACARA BERLANGSUNG<br>SUKSES!)):::startend

    %% ==========================================
    %% FASE 4: PASCA ACARA
    %% ==========================================
    Acara --> Pasca[FASE 4: PASCA ACARA]:::action
    Pasca --> H1[14. H+1: WA Ucapan Terima Kasih<br>Personal ke Sponsor]:::followup
    H1 --> H3[15. H+3: Kirim Foto Backdrop<br>& Suasana Peserta (Full HD)]:::doc
    H3 --> H14[16. H+14: Kirim PDF LPJ Formal<br>& Testimoni]:::doc
    H14 --> Simpan[17. Simpan Kontak di HP<br>dengan Label:<br>'Emina - Baik - Deal 2jt 2025']:::deal
    Simpan --> SelesaiAkhir((SELESAI - LEGENDA)):::startend
