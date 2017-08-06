import { Application } from 'spectron';
import electronPath from 'electron';
import path from 'path';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  beforeAll(async () => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..', 'app')],
    });

    return this.app.start();
  });

  afterAll(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('should open window', async () => {
    const { client, browserWindow } = this.app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBe('SomaFM');
  });

  it('should haven\'t any logs in console of main window', async () => {
    const { client } = this.app;
    const logs = await client.getRenderProcessLogs();
    // Print renderer process logs
    logs.forEach(log => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
    });
    expect(logs).toHaveLength(0);
  });

  it('should load channel cards', async () => {
    const { client } = this.app;

    // const findChannels = () => client.elements('.channelCard');
    const findChannels = async () => {
      const { value } = await client.elements('.channelCard');
      return value.map(el => el.ELEMENT);
    };
    expect(await findChannels()).not.toHaveLength(0);
  });

  it('should load channel view when clicking a channel card', async () => {
    const { client } = this.app;
    const findChannel = () => this.app.client.element('[data-tid="channel"] h2');

    await client.click('.channelCard > a');
    expect(await findChannel().getText()).toBe('Seven Inch Soul');
  });

  it('should back to home if back button clicked', async () => {
    const { client } = this.app;
    await client.element('[data-tid="logo"]').click();

    expect(await client.isExisting('[data-tid="home"]')).toBe(true);
  });
});
