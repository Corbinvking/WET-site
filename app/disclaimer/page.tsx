export const metadata = {
  title: 'Disclaimer | W.E.T.',
  description: 'Important disclaimers and disclosures for W.E.T. users.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-wet py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Disclaimer
            </h1>
            <p className="text-text-muted">
              Last updated: January 2026
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                General Information Only
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                The information provided on W.E.T. (World Event Trading) is for general 
                informational and educational purposes only. All information on the site 
                is provided in good faith, however we make no representation or warranty 
                of any kind, express or implied, regarding the accuracy, adequacy, validity, 
                reliability, availability, or completeness of any information on the site.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Under no circumstance shall we have any liability to you for any loss or 
                damage of any kind incurred as a result of the use of the site or reliance 
                on any information provided on the site. Your use of the site and your 
                reliance on any information on the site is solely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Not Financial Advice
              </h2>
              <div className="p-4 bg-market-down/10 border border-market-down/20 rounded-lg mb-4">
                <p className="text-text-primary font-medium">
                  Nothing on this website constitutes financial, legal, or tax advice.
                </p>
              </div>
              <p className="text-text-secondary leading-relaxed mb-4">
                The content on W.E.T. is not intended to be and should not be construed as 
                financial advice. We are not licensed financial advisors. The information 
                presented regarding prediction markets, market odds, and related analysis 
                is for informational purposes only.
              </p>
              <p className="text-text-secondary leading-relaxed">
                You should consult with a qualified financial advisor, attorney, or other 
                professional before making any financial decisions. Any actions you take 
                based on the information on this website are strictly at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Prediction Market Risks
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Trading on prediction markets involves significant risk, including but not 
                limited to:
              </p>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-market-down rounded-full mt-2 flex-shrink-0" />
                  <span>You may lose some or all of your invested capital</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-market-down rounded-full mt-2 flex-shrink-0" />
                  <span>Market prices can be volatile and change rapidly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-market-down rounded-full mt-2 flex-shrink-0" />
                  <span>Platform-specific risks including technical failures or insolvency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-market-down rounded-full mt-2 flex-shrink-0" />
                  <span>Regulatory uncertainty and potential legal restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-market-down rounded-full mt-2 flex-shrink-0" />
                  <span>Liquidity risks that may affect your ability to enter or exit positions</span>
                </li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-4">
                Only trade with money you can afford to lose entirely.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Third-Party Data
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                W.E.T. displays market data from third-party prediction market platforms 
                including Kalshi and Polymarket. We do not control and are not responsible 
                for the accuracy, timeliness, or completeness of this data.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Market data displayed may be delayed, inaccurate, or incomplete. Always 
                verify current market conditions on the respective trading platforms before 
                making any trading decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                No Endorsement
              </h2>
              <p className="text-text-secondary leading-relaxed">
                References to specific prediction market platforms, financial products, or 
                external websites do not constitute an endorsement. We have no control over 
                the nature, content, and availability of those sites or platforms. The 
                inclusion of any links or mentions does not necessarily imply a recommendation 
                or endorsement of the views expressed within them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Editorial Independence
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Our editorial team operates independently. Analysis, opinions, and coverage 
                reflect the views of individual writers and are not necessarily the views of 
                W.E.T. or its affiliates. We strive for accuracy and fairness but errors may 
                occur. If you believe any content is inaccurate, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Jurisdiction
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Prediction market trading may be restricted or prohibited in certain 
                jurisdictions. It is your responsibility to ensure that your use of 
                prediction market platforms complies with all applicable laws and regulations 
                in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Contact
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you have questions about this disclaimer or any other legal matters, 
                please contact us at legal@wet.news.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}



