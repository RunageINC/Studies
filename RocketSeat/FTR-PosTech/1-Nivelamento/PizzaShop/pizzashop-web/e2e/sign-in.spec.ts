import { expect, test } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/auth/sign-in", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("arthurgomesdmc@gmail.com");
  await page.getByRole("button", { name: "Accessar painel" }).click();

  const toast = page.getByText(
    "Enviamos um link de autenticação para o seu e-mail.",
  );

  await expect(toast).toBeVisible();
});

test("sign in with wrong credentials", async ({ page }) => {
  await page.goto("/auth/sign-in", { waitUntil: "networkidle" });

  await page.getByRole("textbox", { name: "Seu e-mail" }).fill("test@test.com");
  await page.getByRole("button", { name: "Accessar painel" }).click();

  const toast = page.getByText(
    "Erro ao enviar link de autenticação. Credenciais inválidas.",
  );

  await expect(toast).toBeVisible();
});

test("navigate to new restaurant page", async ({ page }) => {
  await page.goto("/auth/sign-in", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Novo estabelecimento" }).click();

  await expect(page).toHaveURL("/auth/sign-up");
});
