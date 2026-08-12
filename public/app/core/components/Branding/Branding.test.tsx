import { render, screen } from 'test/test-utils';

import { selectors } from '@grafana/e2e-selectors';

import { HomeLogo } from './Branding';

describe('HomeLogo', () => {
  it('renders the icon without the wordmark by default', () => {
    render(<HomeLogo homeNav={{ text: 'Home', url: '/' }} />);

    expect(screen.getByRole('img', { name: 'Grafana' })).toBeInTheDocument();
    expect(screen.queryByText('Grafana')).not.toBeInTheDocument();
  });

  it('renders the icon and Grafana wordmark when showWordmark is set', () => {
    render(<HomeLogo homeNav={{ text: 'Home', url: '/' }} showWordmark />);

    const homeLink = screen.getByTestId(selectors.components.Breadcrumbs.breadcrumb('Home'));
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink.querySelector('img')).toBeInTheDocument();
    expect(screen.getByText('Grafana')).toBeInTheDocument();
  });
});
