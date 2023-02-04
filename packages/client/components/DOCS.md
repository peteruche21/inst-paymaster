# Paymaster

This is a guide to help you find your way around the paymaster client.

## Tests

After installing the packages with `yarn install`, you can run the test script with the cmd `yarn run test`.

## Components

This project makes use of tailwindcss and css modules.

Each component is styled using a local stylesheet. This makes it easy to identify where to make changes for any section in the page. For now, the local stylesheet makes use of tailwind's `@apply` keyword.

The stylesheet can be easily converted to **Vanilla CSS** by running the cmd

`npx tailwindcss -i styles/landing/examplefile.module.css -o exampleoutput.css`

Vanilla css is recommended. This is because it is more maintainable and
there is no need for upgrades compared to libaries.

Components bear similar names to it's css modules for easy identification.

E.g `landingpage/firstSection` component can be seen in `styles/landing/firstsection.module.css`

Adopted layout method [Multi-grid-one-page-layout](https://medium.com/@nikkipantony/multi-grid-one-page-layout-css-grid-6efefd537404);

The components directory have these sub folders:

## Active paymaster

- **activeNav**: This is the navbar for the active paymaster's list page.
  `activepaymaster/activeNav`
  - styling: open `styles/navbar.css` to view the navbar styling.
    **All the navbars in the project are styled from**
    `styles/navbar.css`

```
 .active-paymaster-nav {
    @apply paynav;
    }

.active-paymaster-nav .list-ul {
@apply col-start-[-1] w-full grid grid-cols-[1fr_2fr] px-1 content-center text-xs sm:text-sm gap-10 font-light md:font-normal;
}

```

    The`active-paymaster-nav ` class is reusing the same styles with the navbar in the landing page .

To view the paymasters page navigate to `http://localhost:3000/auth/{auth_id}/activepaymaster`

- **allpaymasters** : This is the paymasters list component.
  `activepaymaster/allpaymasters` It is styled from `styles/activepaymaster/allpaymasters.module.css`

- **firstSection** : It is the first part i.e first section of the active paymasters page

- **paymastersListPage** : This is where all the components in the active paymaster directory are assembled together and then exported to the active paymasters route.
  `activepaymaster/paymastersListPage` is exported to `pages/auth/[private]/activepaymaster`

## Auth

- **private**: A HOC for authentication using NEXT_PUBLIC_AUTH_ID environmental variable

## landing page

- **firstSection** : This is the hero section of the landing page.

- **landing** : This is where all the components in the landing page directory are assembled together and then exported to the landing page route.
  `activepaymaster/landingpage` is exported to `/auth/[private]`

**Applied padding for windows scaling b/w 100 to 125**

```

/*************scaling 100 to 125***********************/

@media (min-width: 1100px) and (-webkit-min-device-pixel-ratio: 1.25) {
  .scaleto100 {
    @apply px-20;
  }
}


```

`tailwind.config.css` custom configurations

```

 theme: {
    extend: {
      colors: {
        backgroundTheme: "#11142b",
        secondaryGlow: "#7d0cc1",
        jsClientGlow: "#7D0CC1",
        jsClientDark: "rgba(125, 12, 193, 0.3)",
        blurColor: "rgba(125, 12, 193, 0.5)",
        flowerBlur: "rgba(193, 12, 12, 0.5)",
      },
      fontFamily: {
        monserrat: "Montserrat",
        color: "#fff",
      },
      shadow: {
        btn: "4px 4px 14px rgba(0, 0, 0, 0.15)",
      },


```