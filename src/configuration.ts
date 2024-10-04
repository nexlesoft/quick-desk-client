export class Configuration {
  private static instance: Configuration | null = null;
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

  // Singleton pattern with improved initialization check
  public static getInstance(config?: {
    host: string;
    secretKey: string;
  }): Configuration {
    // If instance does not exist and config is provided, create a new instance
    if (!Configuration.instance && config) {
      Configuration.instance = new Configuration(config);
    }

    // If instance does not exist and no config is provided, throw an error
    if (!Configuration.instance) {
      throw new Error(
        "Configuration is not initialized. Please provide host and secretKey."
      );
    }

    return Configuration.instance;
  }

  // Method to check if configuration has been properly initialized
  public static isInitialized(): boolean {
    return (
      Configuration.instance !== null &&
      !!Configuration.instance.host &&
      !!Configuration.instance.secretKey
    );
  }

  public getHost(): string {
    this.ensureInitialized();
    return this.host;
  }

  public setHost(value: string) {
    this.ensureInitialized();
    this.host = value;
  }

  public getSecretKey(): string {
    this.ensureInitialized();
    return this.secretKey;
  }

  public setSecretKey(value: string) {
    this.ensureInitialized();
    this.secretKey = value;
  }

  // Reinitialize the configuration with new values (optional)
  public static reinitialize(config: { host: string; secretKey: string }) {
    if (Configuration.instance) {
      Configuration.instance.host = config.host;
      Configuration.instance.secretKey = config.secretKey;
    } else {
      Configuration.instance = new Configuration(config);
    }
  }

  // Ensure that the instance has been initialized
  private ensureInitialized() {
    if (!this.host || !this.secretKey) {
      throw new Error("Configuration is not properly initialized.");
    }
  }
}
