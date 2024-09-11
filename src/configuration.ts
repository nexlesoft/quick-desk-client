export class Configuration {
  private static instance: Configuration;
  private host: string;
  private secretKey: string;

  private constructor({
    host,
    secretKey,
  }: {
    host: string;
    secretKey: string;
  }) {
    this.host = host;
    this.secretKey = secretKey;
  }

  // Singleton pattern to ensure a single global configuration instance
  public static getInstance(config?: {
    host: string;
    secretKey: string;
  }): Configuration {
    if (!Configuration.instance && config) {
      Configuration.instance = new Configuration(config);
    }
    return Configuration.instance;
  }

  public getHost(): string {
    return this.host;
  }

  public setHost(value: string) {
    this.host = value;
  }

  public getSecretKey(): string {
    return this.secretKey;
  }

  public setSecretKey(value: string) {
    this.secretKey = value;
  }
}
