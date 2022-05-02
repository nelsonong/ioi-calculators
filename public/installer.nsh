!macro preInit
SetRegView 64
WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\IO Industries\IOI Calculator"
WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files\IO Industries\IOI Calculator"
SetRegView 32
WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files (x86)\IO Industries\IOI Calculator"
WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files (x86)\IO Industries\IOI Calculator"
!macroend