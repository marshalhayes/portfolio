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
                external use, implement API integrations with third parties such
                as Amazon and others, as well as provide basic support for these
                applications.
              </p>

              <p>
                As you get to know me, you'll soon realize that I <i>hate</i>{' '}
                recruiters on LinkedIn. First of all, if you're going to message
                me about a job opportunity, please include the details of said
                job in the first message. I don't want to go back and forth with
                you, especially considering it's unlikely I'm interested in the
                job anyway. If you include the entire job details such as title,
                location, benefits, salary, work environment, etc. in the first
                message, it is 1000x more likely I will message you back.
              </p>

              <p>
                Do however feel free to message me. I appreciate all of the
                messages I get, as I know others might not be as lucky. Just
                know that you're unlikely to hear back from me if you started
                with "Hey, how are you? I have an opportunity available
                immediately I'd like to speak with you about." You might as well
                have knocked on my door and asked, "Have you met our Lord and
                Savior Jesus Christ?" I'll just say no thanks and slam the door.
              </p>
            </div>

            <div>
              <img
                src="/public/images/me.jpg"
                className="max-w-xs block mx-auto my-3 max-h-1/3 md:max-h-auto"
                alt=""
              />
            </div>
          </div>

          <div className="p-3">
            <div className="mb-10">
              <div className="text-sm uppercase font-mono mt-5 mb-2">
                Find me on Social Media
              </div>

              <SocialLinks></SocialLinks>
            </div>
          </div>
        </main>
      </BaseLayout>
    );
  }
}
