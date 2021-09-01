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
      <BaseLayout {...{ ...this.props, title: 'About Me' }}>
        <main className="container mx-auto px-3">
          <div className="flex flex-col md:flex-row">
            <div className="p-3">
              <a href="/" title="Return to blog" className="no-underline">
                &lt; Go back
              </a>

              <h1>Hi, I'm Marshal.</h1>

              <p>
                I'm currently working as a Software Engineer at{' '}
                <a href="https://www.mcrsafety.com" rel="noopener">
                  MCR Safety
                </a>
                , a PPE manufacturing company based out of Collierville,
                Tennessee. There I mainly work on developing web apps for
                internal and external use using tools like jQuery, Bootstrap,
                and Angular, create websites leveraging the powers of{' '}
                <a href="https://www.sitecore.com/" rel="noopener">
                  Sitecore
                </a>
                , implement backend API integrations with third parties such as
                Amazon, AfterShip, and others, as well as provide basic support
                for these applications.
              </p>

              <p>
                Out of these, I spend probably 80% of the time on the frontend,
                while my boss does most of the work on the backend.
              </p>

              <p>
                As you get to know me, you'll realize I am very passionate about
                my work. It all started for me as a hobby back around my high
                school ages when I created a simple website out of necessity for
                a chess club I was running at the time. We needed a way to
                advertise and this was the cheapest option I came up with.
              </p>

              <p>
                Things were a bit simpler then. The site was pretty much made of
                just HTML and CSS hosted on{' '}
                <a href="https://www.godaddy.com/" rel="noopener">
                  GoDaddy
                </a>
                , but I soon branched out to include basic JavaScript and even
                some PHP (lol, I know right?). Definitely won't be doing that
                again.
              </p>

              <p>
                For years, programming was just a hobby of mine. I fell in love
                with it from the beginning and soon went on to get my B.S. in
                Computer Science from the{' '}
                <a href="https://www.memphis.edu" rel="noopener">
                  University of Memphis
                </a>{' '}
                in 2019, along with a dual major in Mathematical Sciences. But
                who's counting? ;)
              </p>

              <p>
                Two or so years later and I would still consider programming a
                hobby of mine. Even though it's my day job now, I hardly think
                of it as one.
              </p>

              <p>
                Outside of programming, you can usually find me hanging with
                friends, at a bar or coffee shop, playing chess, or spending time with my family.
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
            <div className="flex flex-col lg:flex-row lg:space-x-10">
              <div className="lg:w-1/2 mb-3">
                <div className="text-sm uppercase font-mono mb-2">
                  Reach out
                </div>

                <p>
                  Feel free to reach out via{' '}
                  <a href="#" className="email-me">
                    email
                  </a>{' '}
                  or social media if you'd like to chat. I'd love to hear from
                  you. I most definitely won't do your homework though.
                </p>
              </div>

              <div className="lg:w-1/2">
                <div className="text-sm uppercase font-mono mb-2">
                  Find me on Social Media
                </div>

                <SocialLinks></SocialLinks>
              </div>
            </div>
          </div>
        </main>
      </BaseLayout>
    );
  }
}
