export interface WorldBuildingContent {
  title: string;
  largeLetter: string;
  leftSection: {
    title: string;
  };
  rightSection: {
    description: string;
  };
}

export interface HomeWorldBuildingSectionProps {
  content: WorldBuildingContent;
}

export interface WorldBuildingSectionData {
  content: WorldBuildingContent;
}
