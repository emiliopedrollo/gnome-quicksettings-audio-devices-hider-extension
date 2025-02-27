import { AudioDevice, DeviceType } from "./identification";

const Main = imports.ui.main;
const QuickSettings = Main.panel.statusArea.quickSettings;

export class AudioPanel {
  getDisplayedDevices(type: DeviceType): AudioDevice[] {
    const devices =
      type === "output"
        ? QuickSettings._volume._output._deviceItems
        : QuickSettings._volume._input._deviceItems;

    return Array.from(devices, ([id, value]) => ({
      id,
      displayName: value.label.get_text() as string,
      type: type,
    }));
  }

  showInputSlider(visible: boolean) {
    const InputVolumeSlider = QuickSettings._volume._input;
    const InputVolumeIndicator = QuickSettings._volume._inputIndicator;

    InputVolumeSlider.visible = visible || InputVolumeSlider._shouldBeVisible();
    InputVolumeIndicator.visible = InputVolumeSlider._shouldBeVisible();
  }

  removeDevice(id: number, type: DeviceType) {
    if (type === "output") {
      QuickSettings._volume._output._removeDevice(id);
    } else {
      QuickSettings._volume._input._removeDevice(id);
    }
  }

  addDevice(id: number, type: DeviceType) {
    if (type === "output") {
      QuickSettings._volume._output._addDevice(id);
    } else {
      QuickSettings._volume._input._addDevice(id);
    }
  }
}
