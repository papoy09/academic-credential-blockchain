# Kredensial Blockchain — Prototipe Verifikasi Kredensial Akademik
Prototipe smart contract untuk sistem verifikasi kredensial akademik (ijazah,
sertifikat, dan transkrip) berbasis blockchain consortium. Prototipe dijalankan
di local testnet Hardhat dan mencakup penerbitan, verifikasi, dan pencabutan
kredensial.

## Tujuan
Menjawab P5 (Prototipe dan Pengujian) dari Mini Project UTS Blockchain:
- Membuat smart contract `CredentialRegistry.sol`
- Menyediakan script deploy dan test
- Menjalankan pengujian fungsional, keamanan, dan performa

## Fitur
| Fungsi | Deskripsi |
|---|---|
| `setIssuer(address, bool)` | Mendaftarkan institusi sebagai penerbit |
| `issueCredential(bytes32, address, string)` | Menerbitkan kredensial baru |
| `revokeCredential(bytes32)` | Mencabut kredensial |
| `verifyCredential(bytes32)` | Memverifikasi validitas kredensial |


## Informasi Kode
### `contracts/CredentialRegistry.sol`
Smart contract utama. Berisi:
- `struct Credential` — menyimpan issuer, holder, ipfsHash, issuedAt, revoked
- `mapping credentials` — menyimpan kredensial berdasarkan ID
- `mapping authorizedIssuers` — daftar institusi yang berwenang
- `modifier onlyIssuer` — membatasi akses hanya untuk issuer
- `event CredentialIssued` — event saat kredensial diterbitkan
- `event CredentialRevoked` — event saat kredensial dicabut

Fungsi utama:
- `setIssuer(address, bool)` — daftarkan/hapus issuer
- `issueCredential(bytes32, address, string)` — terbitkan kredensial
- `revokeCredential(bytes32)` — cabut kredensial
- `verifyCredential(bytes32)` — verifikasi kredensial

### `scripts/deploy.ts`
Script untuk deploy smart contract ke local testnet. Berisi:
- Deploy `CredentialRegistry`
- Panggil `setIssuer` untuk mendaftarkan akun pertama sebagai issuer
- Log alamat contract dan alamat issuer

### `test/CredentialRegistry.test.ts`
Script pengujian. Berisi 4 test case:
- T-01: Issue credential oleh issuer terdaftar → sukses
- T-02: Issue credential oleh non-issuer → revert
- T-03: Verify credential valid → true
- T-04: Verify credential revoked → false

## Prasyarat
| Alat | Versi Minimum |
|---|---|
| Node.js | v22.13.0 atau lebih baru |
| npm | v10 atau lebih baru |
| Hardhat | v3.x |

Cek versi:

```bash
node -v
npm -v
```

## Dependensi
Install dependensi berikut di dalam folder proyek:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
npm install --save-dev @nomicfoundation/hardhat-ethers-chai-matchers
npm install --save-dev chai @nomicfoundation/hardhat-chai-matchers
npm install --save-dev typescript ts-node @types/node
npm install --save-dev @types/mocha @types/chai
npm install --save-dev @nomicfoundation/hardhat-ignition-ethers
```