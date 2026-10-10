import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 've.usb.fluidlearn',
  appName: 'FluidLearn',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#162A4E',
    },
  },
}

export default config
