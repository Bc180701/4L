import { test, expect } from "@playwright/test";
test("navigation, formules, FAQ, galerie et absence de débordement", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Votre mariage",
  );
  await page.getByRole("button", { name: "Tout refuser" }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  if (isMobile) {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page
      .getByRole("navigation", { name: "Navigation mobile" })
      .getByRole("link", { name: "Formules", exact: true })
      .click();
  }
  await page.locator("#formules").scrollIntoViewIfNeeded();
  await expect(page.locator(".price-card")).toHaveCount(3);
  await page.locator(".price-card.featured a").click();
  await expect(page.locator('select[name="package"]')).toHaveValue(
    "provencale",
  );
  await expect(page.locator('input[name="hours"]')).toHaveValue("4");
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.locator("#galerie").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Détails", exact: true }).click();
  await expect(page.locator(".gallery-item")).toHaveCount(1);
  await page.locator(".gallery-item").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(errors).toEqual([]);
});
test("formulaire : erreurs, échec réel sans fournisseur, puis succès simulé", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Tout refuser" }).click();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page
    .getByRole("button", { name: "Demander ma disponibilité", exact: true })
    .click();
  await expect(page.locator("#contact").getByRole("alert")).toContainText(
    "Vérifiez",
  );
  for (const [name, value] of Object.entries({
    firstName: "Camille",
    lastName: "Martin",
    email: "camille@example.fr",
    phone: "0612345678",
    date: `${new Date().getFullYear() + 1}-06-21`,
    departure: "Eyragues",
    ceremony: "Mairie",
    reception: "Mas provençal",
  }))
    await page.locator(`[name="${name}"]`).fill(value);
  await page.locator('[name="consent"]').check();
  await page.waitForTimeout(1900);
  await page
    .getByRole("button", { name: "Demander ma disponibilité", exact: true })
    .click();
  await expect(page.locator("#contact").getByRole("alert")).toContainText(
    "pas encore activé",
  );
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    }),
  );
  await page
    .getByRole("button", { name: "Demander ma disponibilité", exact: true })
    .click();
  await expect(page.locator("#contact").getByRole("status")).toContainText(
    "Votre demande a bien été envoyée",
  );
});
test("pages légales, métadonnées et images servies", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/La Balade des Gens Heureux/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  const ld = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(ld["@graph"]).toHaveLength(3);
  for (const url of [
    "/mentions-legales",
    "/confidentialite",
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
    "/images/placeholder-4l.svg",
  ])
    expect((await request.get(url)).status()).toBe(200);
});
