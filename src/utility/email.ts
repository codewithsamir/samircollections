// Branded transactional email templates for Samir Collection.
// Table-based layout with inline styles so it renders consistently in Gmail,
// Outlook, Apple Mail and mobile clients (most of them strip <style> blocks).

const BRAND = {
  name: "Samir Collection",
  tagline: "General Store · Bag & Jeans Repairing Centre",
  maroon: "#800000",
  maroonDark: "#4A0000",
  maroonLight: "#F5E6E8",
  gold: "#D4AF37",
  goldLight: "#FDE68A",
  text: "#2B2B2B",
  muted: "#6B6B6B",
};

type EmailType = "VERIFY" | "RESET" | string;

const getContent = (emailType: EmailType) =>
  emailType === "VERIFY"
    ? {
        subject: "Welcome to Samir Collection – Please verify your email",
        preheader: "One quick step to activate your account and start shopping.",
        eyebrow: "Welcome aboard",
        heading: "Verify your email address",
        intro:
          "Thank you for joining Samir Collection! We're delighted to have you. Please confirm your email address to activate your account and unlock everything we offer.",
        cta: "Verify My Email",
        path: "/verifyemail",
        perks: [
          ["Readymade Collection", "Handpicked styles for every occasion"],
          ["Expert Repairs", "Bags, jeans & alterations done right"],
          ["Order Tracking", "Follow your order from start to finish"],
        ],
        footnote: "If you didn't create an account with us, you can safely ignore this email.",
      }
    : {
        subject: "Reset your Samir Collection password",
        preheader: "Use the secure link inside to choose a new password.",
        eyebrow: "Account security",
        heading: "Reset your password",
        intro:
          "We received a request to reset the password for your Samir Collection account. Click the button below to choose a new one.",
        cta: "Reset Password",
        path: "/resetpassword",
        perks: [] as string[][],
        footnote:
          "If you didn't request a password reset, no action is needed – your password will stay the same.",
      };

export const getEmailSubject = (emailType: EmailType) => getContent(emailType).subject;

const buildLink = (hashedToken: string, domain: string, emailType: EmailType) =>
  `${domain.replace(/\/+$/, "")}${getContent(emailType).path}?token=${encodeURIComponent(hashedToken)}`;

// Plain-text alternative improves deliverability and helps with spam filters
export const getVerificationEmailText = (hashedToken: string, domain: string, emailType: EmailType) => {
  const c = getContent(emailType);
  return [
    `${BRAND.name} – ${c.heading}`,
    "",
    "नमस्ते! Hi there,",
    "",
    c.intro,
    "",
    `${c.cta}: ${buildLink(hashedToken, domain, emailType)}`,
    "",
    "This link expires in 1 hour.",
    "",
    c.footnote,
    "",
    `© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.`,
  ].join("\n");
};

export const getVerificationEmailTemplate = (hashedToken: string, domain: string, emailType: EmailType) => {
  const c = getContent(emailType);
  const base = domain.replace(/\/+$/, "");
  const link = buildLink(hashedToken, domain, emailType);
  const year = new Date().getFullYear();

  const perksHtml = c.perks.length
    ? `
      <tr>
        <td style="padding: 8px 40px 8px 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${BRAND.maroonLight}; border-radius: 12px;">
            <tr>
              <td style="padding: 20px 24px 6px 24px; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: bold; color: ${BRAND.maroonDark};">
                What's waiting for you
              </td>
            </tr>
            ${c.perks
              .map(
                ([title, desc]) => `
            <tr>
              <td style="padding: 6px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="top" style="padding-right: 12px; font-size: 16px; color: ${BRAND.gold}; line-height: 22px;">&#9670;</td>
                    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 22px; color: ${BRAND.text};">
                      <strong style="color: ${BRAND.maroon};">${title}</strong> &ndash; ${desc}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`
              )
              .join("")}
            <tr><td style="height: 14px; line-height: 14px; font-size: 0;">&nbsp;</td></tr>
          </table>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${c.subject}</title>
    <style>
      @media only screen and (max-width: 620px) {
        .container { width: 100% !important; border-radius: 0 !important; }
        .px { padding-left: 24px !important; padding-right: 24px !important; }
        .heading { font-size: 24px !important; }
        .btn a { display: block !important; }
      }
      a { text-decoration: none; }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F4EFEA; -webkit-text-size-adjust: 100%;">
    <!-- Preheader: shown as preview text in the inbox -->
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
      ${c.preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4EFEA;">
      <tr>
        <td align="center" style="padding: 32px 12px;">
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(74, 0, 0, 0.12);">

            <!-- Gold accent bar -->
            <tr>
              <td style="height: 6px; line-height: 6px; font-size: 0; background-color: ${BRAND.gold}; background-image: linear-gradient(90deg, ${BRAND.goldLight}, ${BRAND.gold}, ${BRAND.goldLight});">&nbsp;</td>
            </tr>

            <!-- Header -->
            <tr>
              <td align="center" style="background-color: ${BRAND.maroon}; background-image: linear-gradient(135deg, ${BRAND.maroon} 0%, ${BRAND.maroonDark} 100%); padding: 36px 24px 32px 24px;">
                <a href="${base}" target="_blank">
                  <img src="${base}/samircollectionlogo.png" width="88" alt="${BRAND.name}" style="display: block; width: 88px; height: auto; border: 0; border-radius: 50%; background-color: #FFFFFF; padding: 6px;" />
                </a>
                <div style="margin-top: 16px; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: bold; letter-spacing: 1px; color: #FFFFFF;">
                  ${BRAND.name}
                </div>
                <div style="margin-top: 6px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: ${BRAND.goldLight};">
                  ${BRAND.tagline}
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="px" style="padding: 40px 40px 8px 40px;">
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: ${BRAND.gold};">
                  ${c.eyebrow}
                </div>
                <h1 class="heading" style="margin: 8px 0 20px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 36px; color: ${BRAND.maroonDark};">
                  ${c.heading}
                </h1>
                <p style="margin: 0 0 14px 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px; color: ${BRAND.text};">
                  नमस्ते! Hi there,
                </p>
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 26px; color: ${BRAND.text};">
                  ${c.intro}
                </p>
              </td>
            </tr>

            <!-- CTA button -->
            <tr>
              <td align="center" class="px btn" style="padding: 32px 40px 12px 40px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="border-radius: 50px; background-color: ${BRAND.maroon}; box-shadow: 0 6px 16px rgba(128, 0, 0, 0.3);">
                      <a href="${link}" target="_blank" style="display: inline-block; padding: 16px 44px; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; letter-spacing: 0.5px; color: #FFFFFF; text-decoration: none; border-radius: 50px; border: 2px solid ${BRAND.gold};">
                        ${c.cta} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin: 14px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: ${BRAND.muted};">
                  &#128274; This secure link expires in <strong>1 hour</strong>.
                </p>
              </td>
            </tr>

            ${perksHtml}

            <!-- Fallback link -->
            <tr>
              <td class="px" style="padding: 24px 40px 32px 40px;">
                <p style="margin: 0 0 8px 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 20px; color: ${BRAND.muted};">
                  Button not working? Copy and paste this link into your browser:
                </p>
                <p style="margin: 0; padding: 12px 14px; background-color: #FAFAFA; border: 1px dashed #E2D3D5; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; line-height: 18px; word-break: break-all;">
                  <a href="${link}" target="_blank" style="color: ${BRAND.maroon}; text-decoration: underline;">${link}</a>
                </p>
                <p style="margin: 20px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 20px; color: ${BRAND.muted};">
                  ${c.footnote}
                </p>
                <p style="margin: 24px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 24px; color: ${BRAND.text};">
                  धन्यवाद! Warm regards,<br />
                  <strong style="font-family: Georgia, 'Times New Roman', serif; color: ${BRAND.maroon};">The ${BRAND.name} Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: ${BRAND.maroonDark}; padding: 28px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding: 0 10px;"><a href="${base}/shop" target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: ${BRAND.goldLight};">Shop</a></td>
                    <td style="color: ${BRAND.gold}; font-size: 13px;">&middot;</td>
                    <td style="padding: 0 10px;"><a href="${base}/fancy-and-repair" target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: ${BRAND.goldLight};">Repairs</a></td>
                    <td style="color: ${BRAND.gold}; font-size: 13px;">&middot;</td>
                    <td style="padding: 0 10px;"><a href="${base}/about" target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: ${BRAND.goldLight};">About</a></td>
                    <td style="color: ${BRAND.gold}; font-size: 13px;">&middot;</td>
                    <td style="padding: 0 10px;"><a href="${base}/contact" target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: ${BRAND.goldLight};">Contact</a></td>
                  </tr>
                </table>
                <p style="margin: 16px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #D9C4C6;">
                  You're receiving this email because an action was requested on your ${BRAND.name} account.
                </p>
                <p style="margin: 8px 0 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #D9C4C6;">
                  &copy; ${year} ${BRAND.name}. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
