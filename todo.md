# Café Website Enhancement Checklist

- [x] Inspect the existing menu page, visit page, reusable map component, and toast/form conventions.
- [x] Define menu search and dietary-filter data fields without changing existing menu presentation.
- [x] Add a labeled menu search input with clear/reset behavior.
- [x] Add vegan and gluten-free dietary filters with accessible active states and no-results messaging.
- [x] Add a table reservation form with date, time, party size, name, email, and optional notes.
- [x] Add client-side validation, accessible labels, submit feedback, and a clear reservation success state.
- [x] Add an interactive map to the visit page using the existing map component and a configurable café location.
- [x] Verify desktop and mobile layouts, keyboard access, filtering, form validation, map rendering, and production build.
- [ ] Save an enhanced checkpoint and document any remaining real-business setup values.

## Productionization Checklist

- [x] Defer the custom booking domain integration and retain the current reservation request experience.
- [ ] Confirm required reservation credentials, notification recipient, and privacy/consent requirements when a live booking destination is chosen.
- [x] Record the café’s exact coordinates: latitude 16.428703, longitude 81.984480.
- [x] Replace the sample menu with the owner-provided item names, categories, and prices.
- [ ] Add owner-approved dietary tags and allergen notes after review.
- [ ] Collect and place final café photography in the approved asset workflow.
- [x] Validate the retained reservation request flow, updated map location, menu filters, image loading, and production build.
- [ ] Save and deliver a production-ready checkpoint.

## Homepage Gallery

- [x] Add a responsive editorial gallery with placeholders for the room, popular dishes, cold drinks, and counter.
- [x] Label every placeholder for straightforward replacement with final photography.
- [x] Verify homepage gallery layout, contrast, and mobile stacking.

## Gallery Carousel and Reusable Skill

- [x] Add descriptive captions and labels to every gallery slide.
- [x] Link the popular-dishes slide directly to the menu page.
- [x] Convert the gallery placeholders into an accessible carousel with previous/next controls, slide indicators, and keyboard support.
- [x] Verify carousel behavior and responsive layout on desktop and mobile.
- [x] Initialize and author a reusable café gallery enhancement skill.
- [x] Validate the skill package and save a website checkpoint.

## Gallery Photos, Swipe, and Lightbox

- [x] Replace carousel placeholders with real interior and dish photography.
- [x] Add touch swipe gestures with a practical threshold and direction handling.
- [x] Add an accessible fullscreen lightbox with close, Escape, and backdrop controls.
- [x] Verify image alt text, focus behavior, responsive layout, and carousel/lightbox interactions.
- [x] Update the reusable gallery skill with the new photo, swipe, and lightbox patterns.
- [ ] Save and deliver the enhanced website checkpoint and skill.

## Dietary Filters and Pinch Zoom

- [ ] Collect item-level approved vegan and gluten-free classifications from the café.
- [x] Remove the vegan filter option at the café’s request.
- [ ] Connect approved gluten-free classifications to the remaining menu filter logic and visible labels.
- [x] Add mobile pinch-to-zoom and pan behavior to the fullscreen lightbox.
- [x] Verify the vegan-filter removal, zoom reset behavior, accessibility, and responsive layout.
- [x] Update the reusable gallery skill with the zoom interaction pattern.
- [ ] Save and deliver the enhanced website checkpoint.

## Approved Menu Metadata and Final Photography

- [ ] Collect the approved gluten-free classification for every menu item.
- [ ] Activate the gluten-free filter and visible item labels from the approved mapping.
- [ ] Collect and upload the final café interior and dish photographs.
- [x] Collect the four supplied final photography assets and assign them to the gallery slides.
- [x] Replace every stock gallery source with a final café asset and update alt text/captions.
- [x] Validate lightbox zoom, final gallery assets, responsive layout, and production build.
- [x] Update and validate the reusable café workflow skill.
- [ ] Save and deliver the production-ready website and reusable skill.

## Gluten-Free Customization

- [x] Add a selectable gluten-free customization control to every food and snack dish.
- [x] Make the customization state explicit without claiming dishes are inherently gluten-free.
- [x] Keep the gluten-free filter disabled and clearly separate until verified classifications exist.
- [x] Validate item controls, keyboard access, responsive layout, and production build.
- [x] Update the reusable skill with the customization-versus-classification distinction.
- [ ] Save and deliver the customization-ready checkpoint.

## Selected Customizations Summary

- [x] Lift gluten-free request state from menu rows into the menu page.
- [x] Add a visible summary section listing every selected dish customization.
- [x] Add empty-state, clear-all, accessible live updates, and confirmation messaging.
- [x] Validate toggling, summary accuracy, keyboard access, responsive layout, and production build.
- [ ] Save and deliver the customization summary checkpoint.

## Checkout and Persistent Customizations

- [ ] Inspect existing routes, header order action, and customization state.
- [x] Persist selected customizations in local storage across navigation.
- [x] Add configurable estimated pricing for gluten-free requests.
- [x] Add an order-review/checkout route receiving the selected customizations.
- [x] Add a clear order-review submission state without claiming live payment or fulfillment.
- [x] Validate pricing, checkout handoff, responsive layout, and production build.
- [ ] Save and deliver the checkout-ready checkpoint.

## Checkout Editing and Validation

- [x] Add a clear Remove button next to each checkout customization.
- [x] Keep removal synchronized with local storage and estimated pricing.
- [x] Validate required name and phone fields before submission.
- [x] Add inline, accessible error messages and invalid-field focus behavior.
- [x] Validate edit flow, error states, responsive layout, and production build.
- [ ] Save and deliver the improved checkout checkpoint.
