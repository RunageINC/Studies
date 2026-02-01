
{
      "idempotencyKey": {{ `edd-request-${uuid.v4().toString()}` }},
      "locale": "en_US",
      "ownerId": {{ Object.entries(partners.value).find(([, v]) => v === 'GCash')?.[0] }},
      ownerType: PARTNER,
      templateName: "EDD_REQUEST",
      templateCategory: SUPPORT,
      toEmail:"emmanuel@meridianpay.com",
      parameters: [
        {
          key:"subject",
          value: {{ `Case ${caseIdRequested.value} - RFI for ${ getUserDetails.data.fullName}` }}
        },
        {
          key: "body",
          value:"Dear GCash team, <br><br> In order to complete the transaction for the below customer, we need to confirm the source of funds. Please provide the form link to the customer to upload the documents that best applies to their situation. <br><br> <a href=\"https://forms.gcash.com\">https://forms.gcash.com</a> <br><br> Customer name - Christine Delos Reyes <br> Phone number - +63946612000 <br/> Transaction ID - uspay-12345677"
        }
      ]
    }