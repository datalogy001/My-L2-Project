import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }, */
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'install-esim-download',
    loadChildren: () => import('./install-esim-download/install-esim-download.module').then( m => m.InstallEsimDownloadPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'get-your-bundle',
    loadChildren: () => import('./get-your-bundle/get-your-bundle.module').then( m => m.GetYourBundlePageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'gb-plan',
    loadChildren: () => import('./gb-plan/gb-plan.module').then( m => m.GbPlanPageModule)
  },
  {
    path: 'country-plan',
    loadChildren: () => import('./country-plan/country-plan.module').then( m => m.CountryPlanPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-prompt',
    loadChildren: () => import('./login-prompt/login-prompt.module').then( m => m.LoginPromptPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'search-country-zone',
    loadChildren: () => import('./search-country-zone/search-country-zone.module').then( m => m.SearchCountryZonePageModule)
  },
  {
    path: 'country-list',
    loadChildren: () => import('./country-list/country-list.module').then( m => m.CountryListPageModule)
  },
  {
    path: 'select-country',
    loadChildren: () => import('./select-country/select-country.module').then( m => m.SelectCountryPageModule)
  },
  {
    path: 'bundle',
    loadChildren: () => import('./bundle/bundle.module').then( m => m.BundlePageModule)
  },
  {
    path: 'bundle-summary',
    loadChildren: () => import('./bundle-summary/bundle-summary.module').then( m => m.BundleSummaryPageModule)
  },
  {
    path: 'payment-modal',
    loadChildren: () => import('./payment-modal/payment-modal.module').then( m => m.PaymentModalPageModule)
  },
  {
    path: 'payment-successful',
    loadChildren: () => import('./payment-successful/payment-successful.module').then( m => m.PaymentSuccessfulPageModule)
  },
  {
    path: 'order-complete',
    loadChildren: () => import('./order-complete/order-complete.module').then( m => m.OrderCompletePageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'zone-bundle',
    loadChildren: () => import('./zone-bundle/zone-bundle.module').then( m => m.ZoneBundlePageModule)
  },
  {
    path: 'all-countries-list',
    loadChildren: () => import('./all-countries-list/all-countries-list.module').then( m => m.AllCountriesListPageModule)
  },
 
  {
    path: 'created-successful',
    loadChildren: () => import('./created-successful/created-successful.module').then( m => m.CreatedSuccessfulPageModule)
  },
  {
    path: 'esim-all',
    loadChildren: () => import('./esim-all/esim-all.module').then( m => m.EsimAllPageModule)
  },
  {
    path: 'payment-detail',
    loadChildren: () => import('./payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)
  },
  {
    path: 'home-bundle',
    loadChildren: () => import('./home-bundle/home-bundle.module').then( m => m.HomeBundlePageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'currency-settings',
    loadChildren: () => import('./currency-settings/currency-settings.module').then( m => m.CurrencySettingsPageModule)
  },
  {
    path: 'select-currency',
    loadChildren: () => import('./select-currency/select-currency.module').then( m => m.SelectCurrencyPageModule)
  },
  {
    path: 'sharenow',
    loadChildren: () => import('./sharenow/sharenow.module').then( m => m.SharenowPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'notification-settings',
    loadChildren: () => import('./notification-settings/notification-settings.module').then( m => m.NotificationSettingsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'add-payment-card',
    loadChildren: () => import('./add-payment-card/add-payment-card.module').then( m => m.AddPaymentCardPageModule)
  },
  {
    path: 'checkout-verifcation',
    loadChildren: () => import('./checkout-verifcation/checkout-verifcation.module').then( m => m.CheckoutVerifcationPageModule)
  },
  {
    path: 'payment-history',
    loadChildren: () => import('./payment-history/payment-history.module').then( m => m.PaymentHistoryPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'customer-support',
    loadChildren: () => import('./customer-support/customer-support.module').then( m => m.CustomerSupportPageModule)
  },
 
  {
    path: 'active-bundle-detail',
    loadChildren: () => import('./active-bundle-detail/active-bundle-detail.module').then( m => m.ActiveBundleDetailPageModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./slider/slider.module').then( m => m.SliderPageModule)
  },
  {
    path: 'date-picker',
    loadChildren: () => import('./date-picker/date-picker.module').then( m => m.DatePickerPageModule)
  },
  {
    path: 'popover-content-logo',
    loadChildren: () => import('./popover-content-logo/popover-content-logo.module').then( m => m.PopoverContentLogoPageModule)
  },
  {
    path: 'facebook-modal',
    loadChildren: () => import('./facebook-modal/facebook-modal.module').then( m => m.FacebookModalPageModule)
  },
  {
    path: 'download-esim',
    loadChildren: () => import('./download-esim/download-esim.module').then( m => m.DownloadEsimPageModule)
  },
  {
    path: 'compatible-device',
    loadChildren: () => import('./compatible-device/compatible-device.module').then( m => m.CompatibleDevicePageModule)
  },
  {
    path: 'verification-reset',
    loadChildren: () => import('./verification-reset/verification-reset.module').then( m => m.VerificationResetPageModule)
  },
  {
    path: 'push-notification',
    loadChildren: () => import('./push-notification/push-notification.module').then( m => m.PushNotificationPageModule)
  },
  {
    path: 'choose-country',
    loadChildren: () => import('./choose-country/choose-country.module').then( m => m.ChooseCountryPageModule)
  },
  {
    path: 'loading-screen-app',
    loadChildren: () => import('./loading-screen-app/loading-screen-app.module').then( m => m.LoadingScreenAppPageModule)
  },
  {
    path: 'nointernet',
    loadChildren: () => import('./nointernet/nointernet.module').then( m => m.NointernetPageModule)
  },
  {
    path: 'apple-model',
    loadChildren: () => import('./apple-model/apple-model.module').then( m => m.AppleModelPageModule)
  },
  {
    path: 'topup-success',
    loadChildren: () => import('./topup-success/topup-success.module').then( m => m.TopupSuccessPageModule)
  },
  {
    path: 'del-account',
    loadChildren: () => import('./del-account/del-account.module').then( m => m.DelAccountPageModule)
  },
  {
    path: 'device-not-compatible',
    loadChildren: () => import('./device-not-compatible/device-not-compatible.module').then( m => m.DeviceNotCompatiblePageModule)
  },
  {
    path: 'reset-password-success',
    loadChildren: () => import('./reset-password-success/reset-password-success.module').then( m => m.ResetPasswordSuccessPageModule)
  },
  {
    path: 'account-created',
    loadChildren: () => import('./account-created/account-created.module').then( m => m.AccountCreatedPageModule)
  },
  {
    path: 'home-search',
    loadChildren: () => import('./home-search/home-search.module').then( m => m.HomeSearchPageModule)
  },
  {
    path: 'bundle-data-topup',
    loadChildren: () => import('./bundle-data-topup/bundle-data-topup.module').then( m => m.BundleDataTopupPageModule)
  },
  {
    path: 'installation',
    loadChildren: () => import('./installation/installation.module').then( m => m.InstallationPageModule)
  },
  {
    path: 'topupsuccess',
    loadChildren: () => import('./topupsuccess/topupsuccess.module').then( m => m.TopupsuccessPageModule)
  },
  {
    path: 'reset-success',
    loadChildren: () => import('./reset-success/reset-success.module').then( m => m.ResetSuccessPageModule)
  },
  {
    path: 'onboard',
    loadChildren: () => import('./onboard/onboard.module').then( m => m.OnboardPageModule)
  },
  {
    path: 'purchase-success',
    loadChildren: () => import('./purchase-success/purchase-success.module').then( m => m.PurchaseSuccessPageModule)
  },
  {
    path: 'no-plan',
    loadChildren: () => import('./no-plan/no-plan.module').then( m => m.NoPlanPageModule)
  },
  {
    path: 'share-esim',
    loadChildren: () => import('./share-esim/share-esim.module').then( m => m.ShareEsimPageModule)
  },
  {
    path: 'language-settings',
    loadChildren: () => import('./language-settings/language-settings.module').then( m => m.LanguageSettingsPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'choose-card',
    loadChildren: () => import('./choose-card/choose-card.module').then( m => m.ChooseCardPageModule)
  },
  {
    path: 'install-esim',
    loadChildren: () => import('./install-esim/install-esim.module').then( m => m.InstallEsimPageModule)
  },
  {
    path: 'saved-cards',
    loadChildren: () => import('./saved-cards/saved-cards.module').then( m => m.SavedCardsPageModule)
  },
  {
    path: 'your-plan',
    loadChildren: () => import('./your-plan/your-plan.module').then( m => m.YourPlanPageModule)
  },
  {
    path: 'your-package',
    loadChildren: () => import('./your-package/your-package.module').then( m => m.YourPackagePageModule)
  },   {
    path: 'payment-days',
    loadChildren: () => import('./payment-days/payment-days.module').then( m => m.PaymentDaysPageModule)
  },
  {
    path: 'payment-datatopup',
    loadChildren: () => import('./payment-datatopup/payment-datatopup.module').then( m => m.PaymentDatatopupPageModule)
  },
  {
    path: 'bundle-deals',
    loadChildren: () => import('./bundle-deals/bundle-deals.module').then( m => m.BundleDealsPageModule)
  },
  {
    path: 'update-app',
    loadChildren: () => import('./update-app/update-app.module').then( m => m.UpdateAppPageModule)
  },
  {
    path: 'confirm-continue',
    loadChildren: () => import('./confirm-continue/confirm-continue.module').then( m => m.ConfirmContinuePageModule)
  },
  {
    path: 'password-error',
    loadChildren: () => import('./password-error/password-error.module').then( m => m.PasswordErrorPageModule)
  },
  {
    path: 'testpage',
    loadChildren: () => import('./testpage/testpage.module').then( m => m.TestpagePageModule)
  },
  {
    path: 'forgot-linksend',
    loadChildren: () => import('./forgot-linksend/forgot-linksend.module').then( m => m.ForgotLinksendPageModule)
  },
  {
    path: 'success-model',
    loadChildren: () => import('./success-model/success-model.module').then( m => m.SuccessModelPageModule)
  },
  {
    path: 'processing-bar',
    loadChildren: () => import('./processing-bar/processing-bar.module').then( m => m.ProcessingBarPageModule)
  },
  {
    path: 'payment-failed',
    loadChildren: () => import('./payment-failed/payment-failed.module').then( m => m.PaymentFailedPageModule)
  },
  {
    path: 'qr-loader',
    loadChildren: () => import('./qr-loader/qr-loader.module').then( m => m.QrLoaderPageModule)
  },
  {
    path: 'onboard-two',
    loadChildren: () => import('./onboard-two/onboard-two.module').then( m => m.OnboardTwoPageModule)
  },
  {
    path: 'delete-card',
    loadChildren: () => import('./delete-card/delete-card.module').then( m => m.DeleteCardPageModule)
  },
  {
    path: 'permission-modal',
    loadChildren: () => import('./permission-modal/permission-modal.module').then( m => m.PermissionModalPageModule)
  },
  {
    path: 'success-model-esim',
    loadChildren: () => import('./success-model-esim/success-model-esim.module').then( m => m.SuccessModelEsimPageModule)
  },
  {
    path: 'add-card-fpay',
    loadChildren: () => import('./add-card-fpay/add-card-fpay.module').then( m => m.AddCardFpayPageModule)
  },
  {
    path: 'processing-bar-fpay',
    loadChildren: () => import('./processing-bar-fpay/processing-bar-fpay.module').then( m => m.ProcessingBarFpayPageModule)
  },
  {
    path: 'date-picker-fpay',
    loadChildren: () => import('./date-picker-fpay/date-picker-fpay.module').then( m => m.DatePickerFpayPageModule)
  },
  {
    path: 'plan-country',
    loadChildren: () => import('./plan-country/plan-country.module').then( m => m.PlanCountryPageModule)
  },

  {
    path: 'processing-bar-applepay',
    loadChildren: () => import('./processing-bar-applepay/processing-bar-applepay.module').then( m => m.ProcessingBarApplepayPageModule)
  },
 {
    path: 'version-modal',
    loadChildren: () => import('./version-modal/version-modal.module').then( m => m.VersionMOdalPageModule)
  },
   {
    path: 'processing-bar-app-creadit',
    loadChildren: () => import('./processing-bar-app-creadit/processing-bar-app-creadit.module').then( m => m.ProcessingBarAppCreaditPageModule)
  },
  {
    path: 'password-error-model',
    loadChildren: () => import('./password-error-model/password-error-model.module').then( m => m.PasswordErrorModelPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'modal-refercode',
    loadChildren: () => import('./modal-refercode/modal-refercode.module').then( m => m.ModalRefercodePageModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./marketplace/marketplace.module').then( m => m.MarketplacePageModule)
  },
  {
    path: 'modal-nocredit-balance',
    loadChildren: () => import('./modal-nocredit-balance/modal-nocredit-balance.module').then( m => m.ModalNocreditBalancePageModule)
  },
  {
    path: 'processing-bar-app-creadit',
    loadChildren: () => import('./processing-bar-app-creadit/processing-bar-app-creadit.module').then( m => m.ProcessingBarAppCreaditPageModule)
  },
  {
    path: 'payment-topup',
    loadChildren: () => import('./payment-topup/payment-topup.module').then( m => m.PaymentTopupPageModule)
  },
  {
    path: 'credit-topup',
    loadChildren: () => import('./credit-topup/credit-topup.module').then( m => m.CreditTopupPageModule)
  },
  {
    path: 'processing-bar-google-pay-topup',
    loadChildren: () => import('./processing-bar-google-pay-topup/processing-bar-google-pay-topup.module').then( m => m.ProcessingBarGooglePayTopupPageModule)
  },
  {
    path: 'processing-bar-fpay-topup',
    loadChildren: () => import('./processing-bar-fpay-topup/processing-bar-fpay-topup.module').then( m => m.ProcessingBarFpayTopupPageModule)
  },
  {
    path: 'add-card-fpay-topup-wallet',
    loadChildren: () => import('./add-card-fpay-topup-wallet/add-card-fpay-topup-wallet.module').then( m => m.AddCardFpayTopupWalletPageModule)
  },
   {
    path: 'modal-codenotwork',
    loadChildren: () => import('./modal-codenotwork/modal-codenotwork.module').then( m => m.ModalCodenotworkPageModule)
  },
  {
    path: 'signup-socialrefer',
    loadChildren: () => import('./signup-socialrefer/signup-socialrefer.module').then( m => m.SignupSocialreferPageModule)
  },
  {
    path: 'social-refercode',
    loadChildren: () => import('./social-refercode/social-refercode.module').then( m => m.SocialRefercodePageModule)
  },
  {
    path: 'refercode-added',
    loadChildren: () => import('./refercode-added/refercode-added.module').then( m => m.RefercodeAddedPageModule)
  },
  {
    path: 'modal-deleteprofilepic',
    loadChildren: () => import('./modal-deleteprofilepic/modal-deleteprofilepic.module').then( m => m.ModalDeleteprofilepicPageModule)
  },
  {
    path: 'topup-wallet-success',
    loadChildren: () => import('./topup-wallet-success/topup-wallet-success.module').then( m => m.TopupWalletSuccessPageModule)
  },
  {
    path: 'modal-upload-profile-image',
    loadChildren: () => import('./modal-upload-profile-image/modal-upload-profile-image.module').then( m => m.ModalUploadProfileImagePageModule)
  },
  {
    path: 'processing-bar-apple-pay-topup',
    loadChildren: () => import('./processing-bar-apple-pay-topup/processing-bar-apple-pay-topup.module').then( m => m.ProcessingBarApplePayTopupPageModule)
  },
  {
    path: 'modal-careconc',
    loadChildren: () => import('./modal-careconc/modal-careconc.module').then( m => m.ModalCareconcPageModule)
  },
  
  {
    path: 'voucher-topup',
    loadChildren: () => import('./voucher-topup/voucher-topup.module').then( m => m.VoucherTopupPageModule)
  },
  {
    path: 'voucher-reveal',
    loadChildren: () => import('./voucher-reveal/voucher-reveal.module').then( m => m.VoucherRevealPageModule)
  },
  {
    path: 'voucher-reveal2',
    loadChildren: () => import('./voucher-reveal2/voucher-reveal2.module').then( m => m.VoucherReveal2PageModule)
  },
  {
    path: 'modal-couponadded',
    loadChildren: () => import('./modal-couponadded/modal-couponadded.module').then( m => m.ModalCouponaddedPageModule)
  },
  {
    path: 'purchase-success-new',
    loadChildren: () => import('./purchase-success-new/purchase-success-new.module').then( m => m.PurchaseSuccessNewPageModule)
  },
  {
    path: 'del-model-coupen',
    loadChildren: () => import('./del-model-coupen/del-model-coupen.module').then( m => m.DelModelCoupenPageModule)
  },
  {
    path: 'split-payment',
    loadChildren: () => import('./split-payment/split-payment.module').then( m => m.SplitPaymentPageModule)
  },
  {
    path: 'country-code-model',
    loadChildren: () => import('./country-code-model/country-code-model.module').then( m => m.CountryCodeModelPageModule)
  },
  {
    path: 'socail-login-country-phone',
    loadChildren: () => import('./socail-login-country-phone/socail-login-country-phone.module').then( m => m.SocailLoginCountryPhonePageModule)
  },
    {
      path: 'topup-not-applied-modal',
      loadChildren: () => import('./topup-not-applied-modal/topup-not-applied-modal.module').then( m => m.TopupNotAppliedModalPageModule)
    },
    {
        path: 'processing-bar-tlync-pay',
        loadChildren: () => import('./processing-bar-tlync-pay/processing-bar-tlync-pay.module').then( m => m.ProcessingBarTlyncPayPageModule)
      },
      {
        path: 'processing-bar-tlync-top-up-pay',
        loadChildren: () => import('./processing-bar-tlync-top-up-pay/processing-bar-tlync-top-up-pay.module').then( m => m.ProcessingBarTlyncTopUpPayPageModule)
      }
     
   
 
 
 
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
