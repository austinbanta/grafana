import { css, cx } from '@emotion/css';
import { type FC, type JSX } from 'react';

import { colorManipulator, type GrafanaTheme2, type NavModelItem } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { reportInteraction } from '@grafana/runtime';
import { Text, Tooltip, useStyles2, useTheme2 } from '@grafana/ui';
import g8LoginDarkSvg from 'img/g8_login_dark.svg';
import g8LoginLightSvg from 'img/g8_login_light.svg';
import grafanaIconSvg from 'img/grafana_icon.svg';

export interface BrandComponentProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

const LoginLogo: FC<BrandComponentProps & { logo?: string }> = ({ className, logo }) => {
  return <img className={className} src={`${logo ? logo : grafanaIconSvg}`} alt="Grafana" />;
};

const LoginBackground: FC<BrandComponentProps> = ({ className, children }) => {
  const theme = useTheme2();

  const background = css({
    '&:before': {
      content: '""',
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      background: `url(${theme.isDark ? g8LoginDarkSvg : g8LoginLightSvg})`,
      backgroundPosition: 'top center',
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',

      opacity: 0,

      [theme.transitions.handleMotion('no-preference', 'reduce')]: {
        transition: 'opacity 3s ease-in-out',
      },

      [theme.breakpoints.up('md')]: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      },
    },
  });

  return <div className={cx(background, className)}>{children}</div>;
};

const MenuLogo: FC<BrandComponentProps & { alt?: string }> = ({ className, alt = 'Grafana' }) => {
  return <img className={className} src={grafanaIconSvg} alt={alt} />;
};

export function HomeLogo({
  homeNav,
  onClick,
  showWordmark,
}: {
  homeNav?: NavModelItem;
  onClick?: () => void;
  showWordmark?: boolean;
}) {
  const styles = useStyles2(homeLogoStyles, Boolean(showWordmark));

  const onHomeClicked = () => {
    reportInteraction('grafana_home_clicked');
    onClick?.();
  };

  return (
    <Tooltip placement="bottom" content={homeNav?.text || 'Home'}>
      <a
        onClick={onHomeClicked}
        data-testid={selectors.components.Breadcrumbs.breadcrumb('Home')}
        className={styles.homeLogo}
        title={homeNav?.text || 'Home'}
        href={homeNav?.url}
      >
        <Branding.MenuLogo alt={showWordmark ? '' : 'Grafana'} />
        {showWordmark && <span className={styles.wordmark}>{Branding.AppTitle}</span>}
      </a>
    </Tooltip>
  );
}

function homeLogoStyles(theme: GrafanaTheme2, showWordmark: boolean) {
  return {
    homeLogo: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(3),
      width: showWordmark ? 'auto' : theme.spacing(3),
      gap: showWordmark ? theme.spacing(1) : undefined,
      margin: theme.spacing(0, 0.5),
      textDecoration: 'none',
      img: {
        height: '100%',
        width: showWordmark ? theme.spacing(3) : 'auto',
        maxHeight: '100%',
        maxWidth: showWordmark ? theme.spacing(3) : '100%',
        flexShrink: 0,
      },
    }),
    wordmark: css({
      color: theme.colors.text.primary,
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      whiteSpace: 'nowrap',
    }),
  };
}

export function HomeTitle({ homeNav, onClick }: { homeNav?: NavModelItem; onClick?: () => void }) {
  const styles = useStyles2(homeTitleStyles);

  const onHomeClicked = () => {
    reportInteraction('grafana_home_clicked');
    onClick?.();
  };

  return (
    <a onClick={onHomeClicked} className={styles.homeTitle} title={homeNav?.text || 'Home'} href={homeNav?.url}>
      <Text variant="body" truncate>
        {Branding.AppTitle}
      </Text>
    </a>
  );
}

function homeTitleStyles(theme: GrafanaTheme2) {
  return {
    homeTitle: css({
      borderRadius: theme.shape.radius.default,
      color: theme.colors.text.primary,
      padding: theme.spacing(0.25, 0.75),
      margin: theme.spacing(0, -0.75),
      textDecoration: 'none',

      '&:hover, &:focus': {
        backgroundColor: theme.colors.secondary.transparent,
      },

      [theme.transitions.handleMotion('no-preference', 'reduce')]: {
        transition: theme.transitions.create(['background-color'], {
          duration: theme.transitions.duration.short,
        }),
      },
    }),
  };
}

const LoginBoxBackground = () => {
  const theme = useTheme2();
  return css({
    background: colorManipulator.alpha(theme.colors.background.primary, 0.7),
    backgroundSize: 'cover',
  });
};

export class Branding {
  static LoginLogo = LoginLogo;
  static LoginBackground = LoginBackground;
  static MenuLogo = MenuLogo;
  static LoginBoxBackground = LoginBoxBackground;
  static AppTitle = 'Grafana';
  static LoginTitle = 'Welcome to Grafana';
  static HideEdition = false;
  static GetLoginSubTitle = (): null | string => {
    return null;
  };
}
