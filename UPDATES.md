# Atualizações automáticas

O aplicativo e o fluxo de publicação já estão preparados para atualizações assinadas.

Antes da primeira publicação:

1. Gere o par de chaves com `npm run tauri signer generate`.
2. Substitua `SUBSTITUA_PELA_CHAVE_PUBLICA_DO_TAURI` em `src-tauri/tauri.conf.json` pela chave pública.
3. Cadastre a chave privada e a senha nos segredos `TAURI_SIGNING_PRIVATE_KEY` e `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` do GitHub.
4. Confirme que o repositório usado no endpoint do atualizador é `WKMcode-dev/Gen-QrCode`.
5. Publique uma tag como `v0.2.0`; o fluxo criará os instaladores e o manifesto `latest.json`.

A chave privada nunca deve ser adicionada ao repositório.
