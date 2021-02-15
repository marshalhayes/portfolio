import BaseLayout, { BaseLayoutProps } from './layouts/Base';
import React from 'react';
import SocialLinks from './partials/SocialLinks';

interface AboutProps {
  doc: any;
}

export default class Home extends React.Component<
  BaseLayoutProps & AboutProps
> {
  render() {
    return (
      <BaseLayout {...this.props}>
        <main className="container mx-auto px-3">
          <div className="flex flex-col md:flex-row">
            <div className="p-3">
              <a
                href="/"
                title="Return to blog"
                className="text-sizzling-red no-underline"
              >
                &lt; Go back
              </a>

              <h1>Hi, I'm Marshal.</h1>

              <p>
                I'm currently working as a Software Engineer at{' '}
                <a href="https://www.mcrsafety.com" rel="noopener">
                  MCR Safety
                </a>
                , a PPE manufacturing company based in Collierville, Tennessee.
                There I mainly work on developing web apps for internal and
                external use, as well as implement API integrations with third
                parties such as Amazon and others.
              </p>
            </div>

            <img
              src="/public/images/me.jpg"
              className="max-w-xs block mx-auto my-3 max-h-1/3 md:max-h-auto"
              alt=""
            />
          </div>

          <div className="p-3">
            <div className="text-sm uppercase font-mono mt-5">
              Find me on Social Media
            </div>

            <SocialLinks></SocialLinks>
          </div>
        </main>
      </BaseLayout>
    );
  }
}
