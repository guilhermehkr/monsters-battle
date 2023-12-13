import { getByRole, getByTestId, render, screen } from '@testing-library/react';
import { MonsterBattleCard } from './MonsterBattleCard';
import { Monster } from '../../models/interfaces/monster.interface';

describe('<MonsterBattleCard />', () => {
  it('should render default title when monster is NOT provided', () => {
    render(
      <MonsterBattleCard defaultTitle="defaultTitleWhenNoMosterIsProvided" />,
    );
    const defaultTitle = screen.getByText('defaultTitleWhenNoMosterIsProvided');
    expect(defaultTitle).toBeInTheDocument();
  });

  it('should render monster data when monster is provided', () => {
    const monster = {
      hp: 10,
      attack: 12,
      defense: 14,
      speed: 16,
      name: 'monster name',
      imageUrl: 'url',
    } as unknown as Monster;

    render(<MonsterBattleCard monster={monster} />);

    const image = screen.getByAltText('monster');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', monster.imageUrl);

    const name = screen.getByText('monster name');
    expect(name).toBeInTheDocument();

    const hp = screen.getByText('HP');
    expect(hp).toBeInTheDocument();

    const hpProgressBar = screen.getByTestId('hp-testId');
    expect(hpProgressBar).toBeInTheDocument();

    const attack = screen.getByText('Attack');
    expect(attack).toBeInTheDocument();

    const defense = screen.getByText('Defense');
    expect(defense).toBeInTheDocument();

    const speed = screen.getByText('Speed');
    expect(speed).toBeInTheDocument();
  });
});
