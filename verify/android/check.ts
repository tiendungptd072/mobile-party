import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const project = dirname(fileURLToPath(import.meta.url));
const defaultSdk = process.env.LOCALAPPDATA
  ? resolve(process.env.LOCALAPPDATA, "Android/Sdk")
  : undefined;
const sdk =
  process.env.ANDROID_HOME ?? process.env.ANDROID_SDK_ROOT ?? defaultSdk;
if (!sdk || !existsSync(sdk)) {
  throw new Error("Android SDK missing: set ANDROID_HOME or ANDROID_SDK_ROOT.");
}

const java = process.env.JAVA_HOME
  ? resolve(
      process.env.JAVA_HOME,
      "bin",
      process.platform === "win32" ? "java.exe" : "java",
    )
  : "java";
const command = [
  java,
  "-Dfile.encoding=UTF-8",
  "-classpath",
  resolve(project, "gradle/wrapper/gradle-wrapper.jar"),
  "org.gradle.wrapper.GradleWrapperMain",
  ":snippets:compileDebugKotlin",
  "--no-daemon",
  "--console=plain",
];
const child = Bun.spawn(command, {
  cwd: project,
  env: {
    ...process.env,
    ANDROID_HOME: sdk,
    GRADLE_USER_HOME:
      process.env.GRADLE_USER_HOME ?? resolve(project, ".gradle-user-home"),
  },
  stdout: "inherit",
  stderr: "inherit",
});
process.exit(await child.exited);
