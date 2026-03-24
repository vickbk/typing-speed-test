import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
import type { LABEL_LOCATOR, TEXT_MATCHER, TEXT_PATTERN } from "@tests/shared";

export function getTextLocator(page: Page, text: TEXT_MATCHER) {
  return Array.isArray(text)
    ? page.getByText(text[0]).nth(text[1])
    : page.getByText(text);
}

export async function shouldSee(page: Page, ...textes: TEXT_MATCHER[]) {
  const elements: Locator[] = [];
  for (const text of textes) {
    const locator = getTextLocator(page, text);
    await expect(locator).toBeVisible();
    elements.push(locator);
  }
  return elements;
}

export async function shouldNotSee(page: Page, ...textes: TEXT_MATCHER[]) {
  for (const text of textes) {
    await expect(getTextLocator(page, text)).not.toBeVisible();
  }
}

export async function fillLocatorWith(locator: Locator, value: string) {
  await locator.click();
  await locator.fill(value);
}

export async function setLocatorValue(
  page: Page,
  [locator, value]: LABEL_LOCATOR,
) {
  const element = page.locator("label", { hasText: locator });
  await element.click();
  await element.fill(value);
}

export async function setValueForLocators(
  page: Page,
  locatorsAndValues: LABEL_LOCATOR[],
) {
  for (const locatorAndValue of locatorsAndValues) {
    await setLocatorValue(page, locatorAndValue);
  }
}

export function getLocatorByText(
  page: Page,
  [locator, hasText]: [string, TEXT_PATTERN],
) {
  return page.locator(locator, { hasText });
}

export function getButton(page: Page, hasText: TEXT_PATTERN) {
  return getLocatorByText(page, ["button", hasText]);
}

export function getLabel(page: Page, hasText: TEXT_PATTERN) {
  return getLocatorByText(page, ["label", hasText]);
}

export async function clickButton(page: Page, hasText: TEXT_PATTERN) {
  const button = await getButton(page, hasText);
  await button.click();
}

export async function clickLabelInput(page: Page, labelText: TEXT_PATTERN) {
  const label = getLabel(page, labelText);
  await label.click();
}

export async function clickMultipleLabelInputs(
  page: Page,
  labelTexts: TEXT_PATTERN[],
) {
  for (const labelText of labelTexts) {
    await clickLabelInput(page, labelText);
  }
}

export async function isChecked(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).toBeChecked();
  return locator;
}

export async function isNotChecked(
  page: Page,
  selector: string,
): Promise<Locator> {
  const locator = page.locator(selector);
  await expect(locator).not.toBeChecked();
  return locator;
}
