# Elevação de privilégios garantida
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Start-Process pwsh -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Criação segura do drive HKCR
New-PSDrive -Name HKCR -PSProvider Registry -Root HKEY_CLASSES_ROOT -ErrorAction SilentlyContinue | Out-Null

# Função de remoção aprimorada
function Remove-CursorEntries {
    param($path)
    if (Test-Path "HKCR:\$path") {
        Remove-Item -Path "HKCR:\$path" -Recurse -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path "HKLM:\SOFTWARE\Classes\$path") {
        Remove-Item -Path "HKLM:\SOFTWARE\Classes\$path" -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Lista de entradas específicas do Cursor para remoção
$cursorKeys = @(
    'Directory\Background\shell\Open with Cursor',
    'Directory\shell\Open with Cursor',
    '*\shell\Open with Cursor',
    'Applications\cursor.exe'
)

# Remoção das chaves
foreach ($key in $cursorKeys) {
    Remove-CursorEntries $key
}

# Limpeza de arquivos residuais
$paths = @(
    "$env:ProgramFiles\Cursor",
    "$env:LOCALAPPDATA\Programs\Cursor",
    "$env:APPDATA\Cursor",
    "$env:USERPROFILE\.cursor"
)

$paths | ForEach-Object {
    if (Test-Path $_) {
        Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Remoção de serviços e tarefas
Get-Service | Where-Object { $_.DisplayName -match 'Cursor' } | Stop-Service -Force -PassThru | Set-Service -StartupType Disabled
Get-ScheduledTask | Where-Object { $_.TaskName -like '*Cursor*' } | Unregister-ScheduledTask -Confirm:$false

Write-Host "Limpeza completa realizada!" -ForegroundColor Green
Read-Host "Pressione Enter para sair"
