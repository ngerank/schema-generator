function showForm() {
    const formContainer = document.getElementById('formContainer');
    const type = document.getElementById('schemaType').value;
    formContainer.innerHTML = '';

    if (type === 'website') {
        formContainer.innerHTML = `
      <label>Website Name:<input id="websiteName" type="text"></label>
      <label>Website URL:<input id="websiteUrl" type="text"></label>
      <label>Logo URL (Optional):<input id="logoUrl" type="text"></label>
      <button onclick="generateWebsiteSchema()">Generate Schema</button>
    `;
    } else if (type === 'article') {
        formContainer.innerHTML = `
      <label>Article Headline:<input id="articleHeadline" type="text"></label>
      <label>Author Name:<input id="authorName" type="text"></label>
      <label>Publish Date (YYYY-MM-DD):<input id="publishDate" type="text"></label>
      <label>Modified Date (Optional):<input id="modifiedDate" type="text"></label>
      <label>Article URL:<input id="articleUrl" type="text"></label>
      <label>Image URL (Optional):<input id="imageUrl" type="text"></label>
      <button onclick="generateArticleSchema()">Generate Schema</button>
    `;
    } else if (type === 'organization') {
        formContainer.innerHTML = `
    <label>Organization Name:<input id="orgName" type="text"></label>
    <label>Website URL:<input id="orgUrl" type="text"></label>
    <label>Logo URL:<input id="orgLogo" type="text"></label>
    <label>Social Media Links (comma separated):<input id="orgSameAs" type="text" placeholder="https://fb.com/ngerank, https://ig.com/ngerank"></label>
    <button onclick="generateOrganizationSchema()">Generate Schema</button>
  `;
    } else if (type === 'product') {
        formContainer.innerHTML = `
    <label>Product Name:<input id="productName" type="text"></label>
    <label>Description:<input id="productDesc" type="text"></label>
    <label>Product URL:<input id="productUrl" type="text"></label>
    <label>Image URL (Optional):<input id="productImage" type="text"></label>
    <label>Brand Name (Optional):<input id="productBrand" type="text"></label>
    <label>SKU (Optional):<input id="productSKU" type="text"></label>
    <label>Price:<input id="productPrice" type="text"></label>
    <label>Currency (e.g., USD, IDR):<input id="productCurrency" type="text"></label>
    <label>Average Rating (Optional):<input id="productRating" type="text" placeholder="e.g., 4.5"></label>
    <label>Total Reviews (Optional):<input id="productReviewCount" type="text" placeholder="e.g., 123"></label>
    <button onclick="generateProductSchema()">Generate Schema</button>
  `;
    } else if (type === 'localbusiness') {
        formContainer.innerHTML = `
    <label>Business Name:<input id="bizName" type="text"></label>
    <label>Description:<input id="bizDesc" type="text"></label>
    <label>Website URL:<input id="bizUrl" type="text"></label>
    <label>Telephone:<input id="bizPhone" type="text"></label>
    <label>Street Address:<input id="bizStreet" type="text"></label>
    <label>City (Locality):<input id="bizCity" type="text"></label>
    <label>State/Region:<input id="bizRegion" type="text"></label>
    <label>Postal Code:<input id="bizPostalCode" type="text"></label>
    <label>Country:<input id="bizCountry" type="text"></label>
    <label>Opening Hours (Optional, e.g., Mo-Fr 09:00-18:00):<input id="bizOpeningHours" type="text"></label>
    <label>Latitude (Optional):<input id="bizLatitude" type="text"></label>
    <label>Longitude (Optional):<input id="bizLongitude" type="text"></label>
    <button onclick="generateLocalBusinessSchema()">Generate Schema</button>
  `;
    } else if (type === 'service') {
        formContainer.innerHTML = `
    <label>Service Name:<input id="serviceName" type="text"></label>
    <label>Description:<input id="serviceDesc" type="text"></label>
    <label>Service Type:<input id="serviceType" type="text"></label>
    <label>Provider Name:<input id="providerName" type="text"></label>
    <label>Provider URL:<input id="providerUrl" type="text"></label>
    <label>Area Served (Optional):<input id="areaServed" type="text" placeholder="e.g., Indonesia"></label>
    <label>Price (Optional):<input id="servicePrice" type="text" placeholder="e.g., 1500"></label>
    <label>Currency (Optional, e.g., USD, IDR):<input id="serviceCurrency" type="text"></label>
    <button onclick="generateServiceSchema()">Generate Schema</button>
  `;
    } else if (type === 'breadcrumb') {
        breadcrumbsContainer.innerHTML = `
    <div id="breadcrumbsContainer">
      <div class="breadcrumb-item">
        <label>Name:<input type="text" class="breadcrumb-name" placeholder="e.g., Home"></label>
        <label>URL:<input type="text" class="breadcrumb-url" placeholder="e.g., https://ngerank.id/"></label>
      </div>
      <button class="breadcrumb-button" type="button" onclick="addBreadcrumb()">+ Add Breadcrumb</button>
    </div>
  `;
    }


}

function generateWebsiteSchema() {
    const name = document.getElementById('websiteName').value;
    const url = document.getElementById('websiteUrl').value;
    const logo = document.getElementById('logoUrl').value;
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": name,
        "url": url
    };
    if (logo) schema.logo = logo;
    document.getElementById('outputSchema').value = JSON.stringify(schema, null, 2);
}

function generateArticleSchema() {
    const headline = document.getElementById('articleHeadline').value;
    const author = document.getElementById('authorName').value;
    const publishDate = document.getElementById('publishDate').value;
    const modifiedDate = document.getElementById('modifiedDate').value;
    const url = document.getElementById('articleUrl').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": headline,
        "author": {
            "@type": "Person",
            "name": author
        },
        "datePublished": publishDate,
        "url": url
    };
    if (modifiedDate) schema.dateModified = modifiedDate;
    if (imageUrl) schema.image = imageUrl;
    document.getElementById('outputSchema').value = JSON.stringify(schema, null, 2);
}

function generateOrganizationSchema() {
    const name = document.getElementById('orgName').value;
    const url = document.getElementById('orgUrl').value;
    const logo = document.getElementById('orgLogo').value;
    const sameAsRaw = document.getElementById('orgSameAs').value;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": name,
        "url": url
    };

    if (logo) schema.logo = logo;

    if (sameAsRaw) {
        const sameAsArray = sameAsRaw.split(',').map(link => link.trim());
        schema.sameAs = sameAsArray;
    }

    document.getElementById('outputSchema').value = JSON.stringify(schema, null, 2);
}

function generateProductSchema() {
    const name = document.getElementById('productName').value;
    const desc = document.getElementById('productDesc').value;
    const url = document.getElementById('productUrl').value;
    const image = document.getElementById('productImage').value;
    const brand = document.getElementById('productBrand').value;
    const sku = document.getElementById('productSKU').value;
    const price = document.getElementById('productPrice').value;
    const currency = document.getElementById('productCurrency').value;
    const ratingValue = document.getElementById('productRating').value;
    const reviewCount = document.getElementById('productReviewCount').value;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "description": desc,
        "url": url,
        "offers": {
            "@type": "Offer",
            "priceCurrency": currency,
            "price": price,
            "url": url,
            "availability": "https://schema.org/InStock"
        }
    };

    if (image) schema.image = image;
    if (brand) schema.brand = {
        "@type": "Brand",
        "name": brand
    };
    if (sku) schema.sku = sku;
    if (ratingValue && reviewCount) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": reviewCount
        };
    }

    document.getElementById('outputSchema').value = JSON.stringify(schema, null, 2);
}

function generateLocalBusinessSchema() {
    const name = document.getElementById('bizName').value;
    const desc = document.getElementById('bizDesc').value;
    const url = document.getElementById('bizUrl').value;
    const phone = document.getElementById('bizPhone').value;
    const street = document.getElementById('bizStreet').value;
    const city = document.getElementById('bizCity').value;
    const region = document.getElementById('bizRegion').value;
    const postal = document.getElementById('bizPostalCode').value;
    const country = document.getElementById('bizCountry').value;
    const openingHours = document.getElementById('bizOpeningHours').value;
    const latitude = document.getElementById('bizLatitude').value;
    const longitude = document.getElementById('bizLongitude').value;

    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": name,
        "description": desc,
        "url": url,
        "telephone": phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": street,
            "addressLocality": city,
            "addressRegion": region,
            "postalCode": postal,
            "addressCountry": country
        }
    };

    if (openingHours) {
        schema.openingHours = openingHours;
    }

    if (latitude && longitude) {
        schema.geo = {
            "@type": "GeoCoordinates",
            "latitude": latitude,
            "longitude": longitude
        };
    }

    document.getElementById('outputSchema').value = JSON.stringify(schema, null, 2);
}

function generateServiceSchema() {
    const name = document.getElementById('serviceName').value;
    const desc = document.getElementById('serviceDesc').value;
    const type = document.getElementById('serviceType').value;
    const providerName = document.getElementById('providerName').value;
    const providerUrl = document.getElementById('providerUrl').value;
    const areaServed = document.getElementById('areaServed').value;
    const price = document.getElementById('servicePrice').value;
    const currency = document.getElementById('serviceCurrency').value;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": desc,
        "serviceType": type,
        "provider": {
            "@type": "Organization",
            "name": providerName,
            "url": providerUrl
        }
    };

    if (areaServed) {
        schema.areaServed = {
            "@type": "AdministrativeArea",
            "name": areaServed
        };
    }

    if (price && currency) {
        schema.offers = {
            "@type": "Offer",
            "price": price,
            "priceCurrency": currency
        };
    }

    document.getElementById('outputSchema').value = JSON.stringify(schema, null, 2);
}

function addBreadcrumb() {
    const container = document.getElementById('breadcrumbsContainer');
    const div = document.createElement('div');
    div.className = 'breadcrumb-item';
    div.innerHTML = `
    <label>Name:<input type="text" class="breadcrumb-name" placeholder="e.g., Category"></label>
    <label>URL:<input type="text" class="breadcrumb-url" placeholder="e.g., https://site.com/category"></label>
  `;
    container.appendChild(div);
}

function generateDynamicBreadcrumbSchema() {
    const names = document.querySelectorAll('.breadcrumb-name');
    const urls = document.querySelectorAll('.breadcrumb-url');
    const itemListElement = [];

    names.forEach((nameInput, index) => {
        const name = nameInput.value;
        const url = urls[index].value;
        if (name && url) {
            itemListElement.push({
                "@type": "ListItem",
                "position": index + 1,
                "name": name,
                "item": url
            });
        }
    });

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
    };

    document.getElementById('outputSchema').value = JSON.stringify(schema, null, 2);
}

function copySchema() {
    const output = document.getElementById('outputSchema');
    output.select();
    document.execCommand('copy');
    alert('Schema copied to clipboard!');
}