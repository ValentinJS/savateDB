import { Button, Card, createStyles, Group, Image, Text } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { IGame } from '../types';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
}));

interface BadgeCardProps {
  image?: string;
  title: string;
  description: string;
  game: IGame;
}

export function BadgeCard({ image, title, description, game }: BadgeCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text lineClamp={2} size="lg" weight={500}>
            {title}
          </Text>
        </Group>
        <Text lineClamp={4} size="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          onClick={() => {
            openModal({
              title: 'Game details',
              children: JSON.stringify(game),
              size: 'xl',
            });
          }}>
          Show details
        </Button>
      </Group>
    </Card>
  );
}
