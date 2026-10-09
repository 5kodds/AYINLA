# AYINLA Image Replacement Guide

## Photography principle

Every photograph must demonstrate AYINLA's real design work, real clients with permission, or its actual craftsmanship. The current website uses clearly marked reference images to show what to photograph. Images are not assertions that AYINLA created the garments or employed the people shown.

The online images are Pexels references, whose general license allows commercial website use, but it does not grant rights to suggest an identifiable person endorses AYINLA. Obtain model and property rights where needed. Do not use Pexels content as part of the logo or trademark. Review https://www.pexels.com/license and https://www.pexels.com/terms-of-service before live use.

## Detailed replacement manifest

| Slot or asset | Desired original image | Crop and framing | Notes |
|---|---|---|---|
| `hero-reference.webp` | Ayinla's best completed ceremonial agbada, model facing camera, attractive studio environment | Tall portrait, at least 1400 x 1600 pixels, keep head and garment visible in right half | Current local hero is a crop from the approved design screenshot provided during this project. Replace before public launch because standalone photo rights have not been independently cleared. |
| `agbada-emerald.svg` | True emerald or deep green AYINLA agbada; embroidery clearly visible | 3:4 portrait, full body with room for crop | Use for collection card and Emerald Study. |
| `agbada-ceremony.svg` | Second distinct ceremonial agbada in navy, cream or complementary colour | 3:4 portrait, subtle setting, cap if appropriate | Should be an actual AYINLA commission. |
| `senator-indigo.svg` | Senator-style tunic and trousers, true fit and clean neckline visible | 3:4 portrait, front view, minimum 1200 x 1600 | Generic Nigerian attire is not a substitute for genuine senator tailoring. |
| `senator-onyx.svg` | Second senator look with sharp seams and accurate finishing | 3:4 portrait, full length and detail shot | Demonstrate construction and drape. |
| `kaftan-sand.svg` | Relaxed neutral kaftan in natural light | 3:4 portrait with uncluttered background | Show sleeve, hem and real textile behaviour. |
| `kaftan-night.svg` | Distinct darker kaftan look in a different setting | 3:4 portrait, standing or walking | Capture movement without obscuring garment. |
| `craft-reference.svg` | Ayinla or a real maker cutting, fitting, sewing or finishing fabric | 4:5 or landscape, hands and workspace in focus | Work should actually occur in AYINLA's production environment. |
| `atelier-reference.svg` | Portrait of Ayinla in his actual workshop | 4:5 environmental portrait | Secure the designer's approval and capture enough clean negative space. |
| Product detail second photo | The SAME garment from the side or back | 3:4 portrait | Do not reuse a different garment as a detail shot. |
| Product detail macro | Stitching, embroidery, trim, lining or fabric weave on that actual garment | 1:1 or 4:5 macro | Focus must be crisp and accurately depict materials. |

## External reference image IDs

The site attempts to load these Pexels references when a visitor is online. If an image fails, the local illustration remains visible.

| Reference | Pexels photo page |
|---|---|
| Agbada hero source | https://www.pexels.com/photo/nigerian-man-in-traditional-yoruba-attire-36690235/ |
| First agbada | https://www.pexels.com/photo/portrait-of-a-man-in-traditional-nigerian-attire-31762078/ |
| Other ceremonial reference | https://www.pexels.com/photo/man-in-traditional-nigerian-agbada-attire-35013624/ |
| Senator category visual proxy | https://www.pexels.com/photo/man-in-traditional-nigerian-attire-with-patterned-cap-35331756/ |
| Kaftan category | https://www.pexels.com/photo/modern-portrait-of-man-in-traditional-nigerian-kaftan-38188493/ |
| Second senator visual proxy | https://www.pexels.com/photo/traditional-nigerian-attire-in-portrait-37283116/ |
| Alternate kaftan visual proxy | https://www.pexels.com/photo/nigerian-man-in-traditional-agbada-attire-37320665/ |
| Tailoring workshop | https://www.pexels.com/photo/a-man-sewing-a-cloth-12672102/ |
| Atelier workshop | https://www.pexels.com/photo/male-tailor-working-with-pattern-in-workshop-5830628/ |

Some stock references do not exactly match the indicated garment type. They are visual composition guidance only and must not be used as evidence of service or product availability.

## Replacement process

1. Obtain Ayinla's original photograph and documented consent to use it.
2. Resize and export to a web-friendly WebP or AVIF, keeping the original master separately.
3. Place the asset in `public/assets/images/`.
4. Update the appropriate image name in `src/lib/site.mjs`. Its `picture()` helper currently expects SVG except for `hero-reference.webp`; extend the helper to support your new image formats as needed.
5. Remove the `stock` image ID for that slot so remote photography cannot overwrite the actual photograph.
6. Update the alt text with a true description of the garment, not aspirational marketing copy.
7. Repeat tests on mobile, especially head cropping and full-length garment visibility.
8. When every placeholder is replaced, remove draft/reference disclosures only with the business owner's approval.

For garment records, update titles, descriptions, fabric information, variant options and actual commission status at the same time as the photograph. Do not publish fictional sample garment titles as purchasable products.
