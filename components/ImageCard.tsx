import { Button, createStyles, Paper } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { IGame } from '../types';

const useStyles = createStyles((theme) => ({
  card: {
    height: 280,
    width: 210,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
    background: 'rgba(0, 0, 0, 0.5)',
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  image: {},

  button: {},
}));

interface BadgeCardProps {
  image?: string;
  title: string;
  description: string;
  game: IGame;
}

export function ImageCard({ image, title, description, game }: BadgeCardProps) {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" p="xl" radius="md" sx={{ backgroundImage: `url(${image})` }} className={classes.card}>
      <Button
        color="dark"
        className={classes.button}
        onClick={() => {
          openModal({
            title: 'Game details',
            children: JSON.stringify(game),
            size: 'xl',
          });
        }}>
        See details
      </Button>
    </Paper>
  );
}
