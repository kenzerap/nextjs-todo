'use client';

import { Card } from 'flowbite-react';
import classes from './ProductListFilter.module.css';
import { IoSearch } from 'react-icons/io5';
import { Input, Select } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { Category } from '@/models/category.model';
import { ProductFilterOptions } from '@/models/product.model';

export default function ProductListFilter({
  categories,
  onFilter,
}: {
  categories: Category[];
  onFilter: (data: any) => void;
}) {
  const [categoryOptions, setCategoryOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);

  const [sortByOptions, setSortByOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Discount', value: 'discountPercentage' },
    { label: 'Best seller', value: 'soldCount' },
  ]);

  const [sortByDirectionOptions, setSortByDirectionOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' },
  ]);

  const [queryFilter, setQueryFilter] = useState<ProductFilterOptions>({
    searchBy: 'name',
    categoryCode: '',
    page: 1,
    itemPerPage: 50,
    search: '',
    orderBy: 'name',
    orderByDirection: 'asc',
  });

  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const options = categories.map((category) => ({
      value: category.code,
      label: category.name,
    }));

    setCategoryOptions([{ label: 'All', value: '' }, ...options]);
  }, [categories]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onFilter(queryFilter);
    }, 0);

    return () => clearTimeout(timeOutId);
  }, [onFilter, queryFilter]);

  const handleQueryChange = (queryKey: string, queryValue: string | number) => {
    setQueryFilter((current) => {
      return { ...current, [queryKey]: queryValue };
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setQueryFilter((current) => {
        return { ...current, search: searchText || '' };
      });
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchText]);

  return (
    <Card className="overflow-x-auto">
      <div className={classes.filterRow}>
        <Input
          size="large"
          style={{ maxWidth: '20rem' }}
          placeholder="Product name"
          prefix={<IoSearch />}
          variant="filled"
          onChange={handleSearchChange}
        />

        <div className={classes.filterRight}>
          <div className="flex items-center">
            <label className="mr-4">Category:</label>
            <Select
              style={{ width: '10rem' }}
              size="large"
              onChange={(value) => handleQueryChange('categoryCode', value)}
              options={categoryOptions}
              variant="filled"
              placeholder="Category"
              defaultValue={queryFilter.categoryCode}
            />
          </div>

          <div className="flex items-center">
            <label className="mr-4">Sort By:</label>
            <Select
              style={{ width: '10rem' }}
              size="large"
              onChange={(value) => handleQueryChange('orderBy', value)}
              options={sortByOptions}
              variant="filled"
              placeholder="Sort By"
              defaultValue={queryFilter.orderBy}
            />
          </div>

          <div className="flex items-center">
            <label className="mr-4">Direction:</label>
            <Select
              style={{ width: '10rem' }}
              size="large"
              onChange={(value) => handleQueryChange('orderByDirection', value)}
              options={sortByDirectionOptions}
              variant="filled"
              placeholder="Direction"
              defaultValue={queryFilter.orderByDirection}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
